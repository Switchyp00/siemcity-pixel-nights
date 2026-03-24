import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import SiemcityV2 from "./pages/SiemcityV2.tsx";
import SiemcityV2Phase2 from "./pages/SiemcityV2Phase2.tsx";
import SiemcityV2Phase3 from "./pages/SiemcityV2Phase3.tsx";
import SiemcityV2Phase4 from "./pages/SiemcityV2Phase4.tsx";
import Community from "./pages/Community.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects/siemcity-v2" element={<SiemcityV2 />} />
          <Route path="/projects/siemcity-v2/phase-2" element={<SiemcityV2Phase2 />} />
          <Route path="/projects/siemcity-v2/phase-3" element={<SiemcityV2Phase3 />} />
          <Route path="/projects/siemcity-v2/phase-4" element={<SiemcityV2Phase4 />} />
          <Route path="/community" element={<Community />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
