import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { productSales, serviceSales } from "@/data/sample";

const k = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const SalesReport = () => {
  const totalProducts = productSales.reduce((a, s) => a + s.qty * s.unitPrice, 0);
  const totalServices = serviceSales.reduce((a, s) => a + s.qty * s.unitPrice, 0);

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Relatório de vendas | Barber Manager</title>
        <meta name="description" content="Tabelas separadas com vendas de produtos e de serviços." />
        <link rel="canonical" href="/sales-report" />
      </Helmet>

      <h1 className="text-3xl font-semibold">Relatório de vendas</h1>

      <section aria-labelledby="produtos">
        <Card>
          <CardHeader>
            <CardTitle id="produtos">Vendas de produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Total: {k(totalProducts)}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Qtd.</TableHead>
                  <TableHead className="text-right">Preço unit.</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productSales.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{new Date(s.date).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>{s.productName}</TableCell>
                    <TableCell className="text-right">{s.qty}</TableCell>
                    <TableCell className="text-right">{k(s.unitPrice)}</TableCell>
                    <TableCell className="text-right">{k(s.qty * s.unitPrice)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="servicos">
        <Card>
          <CardHeader>
            <CardTitle id="servicos">Vendas de serviços</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Total: {k(totalServices)}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead className="text-right">Qtd.</TableHead>
                  <TableHead className="text-right">Preço unit.</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serviceSales.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{new Date(s.date).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>{s.serviceName}</TableCell>
                    <TableCell className="text-right">{s.qty}</TableCell>
                    <TableCell className="text-right">{k(s.unitPrice)}</TableCell>
                    <TableCell className="text-right">{k(s.qty * s.unitPrice)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default SalesReport;
