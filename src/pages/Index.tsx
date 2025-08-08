import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <Helmet>
        <title>Barber Manager | Gestão de Barbearia</title>
        <meta name="description" content="Sistema de gestão de barbearia: produtos, serviços, vendas e painel financeiro." />
        <link rel="canonical" href="/" />
      </Helmet>
      <section className="text-center px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-brand bg-clip-text text-transparent">Gestão completa para sua barbearia</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">Controle estoque, registre vendas e acompanhe seu lucro bruto em um painel elegante e fácil de usar.</p>
        <div className="flex items-center justify-center gap-3">
          <Button asChild variant="hero" size="lg">
            <Link to="/dashboard">Abrir Painel</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/products">Cadastrar Itens</Link>
          </Button>
        </div>
        <div className="relative mt-14">
          <div className="mx-auto h-2 w-72 rounded-full opacity-20 bg-gradient-brand animate-shimmer bg-[length:200%_100%]" />
        </div>
      </section>
    </main>
  );
};

export default Index;
