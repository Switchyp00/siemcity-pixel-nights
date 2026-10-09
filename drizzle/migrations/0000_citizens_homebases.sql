CREATE TABLE public.citizens (
  id uuid PRIMARY KEY,
  username text NOT NULL,
  display_name text NOT NULL DEFAULT '',
  network_address text NOT NULL,
  district int NOT NULL DEFAULT 1,
  avatar jsonb NOT NULL DEFAULT '{}'::jsonb,
  bio text NOT NULL DEFAULT '',
  tutorial_done boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX citizens_username_lower ON public.citizens (lower(username));
CREATE UNIQUE INDEX citizens_network_address ON public.citizens (network_address);
GRANT SELECT, INSERT, UPDATE ON public.citizens TO authenticated;
GRANT ALL ON public.citizens TO service_role;
ALTER TABLE public.citizens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Signed-in users can view citizen profiles" ON public.citizens FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users create their own citizen" ON public.citizens FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "Users update their own citizen" ON public.citizens FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE TABLE public.homebases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL UNIQUE REFERENCES public.citizens(id) ON DELETE CASCADE,
  name text NOT NULL,
  width int NOT NULL DEFAULT 8,
  height int NOT NULL DEFAULT 8,
  floor text NOT NULL DEFAULT 'wood',
  placed jsonb NOT NULL DEFAULT '[]'::jsonb,
  inventory jsonb NOT NULL DEFAULT '[]'::jsonb,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.homebases TO authenticated;
GRANT ALL ON public.homebases TO service_role;
ALTER TABLE public.homebases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners view their homebase" ON public.homebases FOR SELECT TO authenticated USING (owner_id = auth.uid());
CREATE POLICY "Owners create their homebase" ON public.homebases FOR INSERT TO authenticated WITH CHECK (owner_id = auth.uid());
CREATE POLICY "Owners update their homebase" ON public.homebases FOR UPDATE TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;
CREATE TRIGGER citizens_touch BEFORE UPDATE ON public.citizens FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER homebases_touch BEFORE UPDATE ON public.homebases FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
-- network_address and username are immutable after creation
CREATE OR REPLACE FUNCTION public.citizens_lock_identity() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.network_address = OLD.network_address; NEW.id = OLD.id; NEW.created_at = OLD.created_at; RETURN NEW; END $$;
CREATE TRIGGER citizens_lock BEFORE UPDATE ON public.citizens FOR EACH ROW EXECUTE FUNCTION public.citizens_lock_identity();