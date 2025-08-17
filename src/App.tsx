import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Sales from "./pages/Sales";
import Purchases from "./pages/Purchases";
import Reports from "./pages/Reports";
import Clients from "./pages/Clients";
import SalesReport from "./pages/SalesReport";
import Auth from "./pages/Auth";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route index element={<Index />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="services" element={<Services />} />
              <Route path="sales" element={<Sales />} />
              <Route path="sales-report" element={<SalesReport />} />
              <Route path="purchases" element={<Purchases />} />
              <Route path="reports" element={<Reports />} />
              <Route path="clients" element={<Clients />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
