import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const NavLink = ({ to, label }: { to: string; label: string }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Button asChild variant={active ? "secondary" : "ghost"} size="sm">
      <Link to={to}>{label}</Link>
    </Button>
  );
};

const AppLayoutInner = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <meta name="theme-color" content="#000000" />
      </Helmet>
      <header className="border-b">
        <nav className="container flex items-center justify-between py-4 gap-4">
          <Link to="/" className="font-extrabold text-xl bg-gradient-brand bg-clip-text text-transparent">Barber Manager</Link>
          <div className="flex flex-wrap gap-2">
            <NavLink to="/dashboard" label="Dashboard" />
            <NavLink to="/sales" label="Vendas" />
            <NavLink to="/products" label="Produtos" />
            <NavLink to="/services" label="Serviços" />
            <NavLink to="/purchases" label="Compras" />
            <NavLink to="/reports" label="Relatórios" />
            <NavLink to="/clients" label="Clientes" />
          </div>
        </nav>
      </header>
      <main className="container py-8">
        <Outlet />
      </main>
    </div>
  );
};

const AppLayout = () => (
  <AppLayoutInner />
);

export default AppLayout;
