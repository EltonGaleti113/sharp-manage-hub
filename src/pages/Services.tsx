import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { services } from "@/data/sample";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const Services = () => {
  const [form, setForm] = useState({ name: "", price: "", cost: "" });

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Serviços | Barber Manager</title>
        <meta name="description" content="Cadastro de serviços da barbearia." />
        <link rel="canonical" href="/services" />
      </Helmet>

      <h1 className="text-3xl font-semibold">Serviços</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Lista</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Custo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map(s => (
                  <TableRow key={s.id}>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.price.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</TableCell>
                    <TableCell>{(s.cost ?? 0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Novo serviço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Nome" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
            <Input placeholder="Preço (R$)" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} />
            <Input placeholder="Custo (R$)" value={form.cost} onChange={e=>setForm(f=>({...f,cost:e.target.value}))} />
            <Button onClick={()=>{
              toast({ title: "Serviço cadastrado (demo)", description: `${form.name} salvo apenas na sessão.` })
            }}>Salvar</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;
