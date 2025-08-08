import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products, services, sampleRevenueSeries } from "@/data/sample";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const k = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const Dashboard = () => {
  const revenue = sampleRevenueSeries.reduce((a, b) => a + b.revenue, 0);
  const cost = sampleRevenueSeries.reduce((a, b) => a + b.cost, 0);
  const profit = revenue - cost;
  const lowStock = products.filter(p => p.stock <= 5);
  const topServices = services.slice(0, 3);

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Dashboard | Barber Manager</title>
        <meta name="description" content="Resumo financeiro diário, semanal e mensal da barbearia." />
        <link rel="canonical" href="/dashboard" />
      </Helmet>

      <h1 className="text-3xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle>Receita</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{k(revenue)}</CardContent>
        </Card>
        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle>Custo</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{k(cost)}</CardContent>
        </Card>
        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle>Lucro Bruto</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{k(profit)}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução de faturamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sampleRevenueSeries} margin={{ left: 12, right: 12 }}>
                <defs>
                  <linearGradient id="rev" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--brand))" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="hsl(var(--brand-2))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--brand))" fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Estoque baixo</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {lowStock.map(p => (
                <li key={p.id} className="flex justify-between">
                  <span>{p.name}</span>
                  <span className="text-muted-foreground">{p.stock} un.</span>
                </li>
              ))}
              {lowStock.length === 0 && (
                <p className="text-muted-foreground">Nenhum item com estoque baixo.</p>
              )}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mais vendidos (serviços)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {topServices.map(s => (
                <li key={s.id} className="flex justify-between">
                  <span>{s.name}</span>
                  <span className="text-muted-foreground">{k(s.price)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
