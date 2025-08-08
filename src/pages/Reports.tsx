import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "./_components/DatePickerRange";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { sampleRevenueSeries } from "@/data/sample";

const Reports = () => {
  return (
    <div className="space-y-8">
      <Helmet>
        <title>Relatórios | Barber Manager</title>
        <meta name="description" content="Histórico de vendas, lucro bruto por produto e evolução do faturamento." />
        <link rel="canonical" href="/reports" />
      </Helmet>

      <h1 className="text-3xl font-semibold">Relatórios</h1>

      <Card>
        <CardHeader>
          <CardTitle>Período</CardTitle>
        </CardHeader>
        <CardContent>
          <DatePicker />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de vendas (demo)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Receita</TableHead>
                <TableHead>Custo</TableHead>
                <TableHead>Lucro Bruto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleRevenueSeries.map(r => (
                <TableRow key={r.date}>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.revenue.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</TableCell>
                  <TableCell>{r.cost.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</TableCell>
                  <TableCell>{(r.revenue-r.cost).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
