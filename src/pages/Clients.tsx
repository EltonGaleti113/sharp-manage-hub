import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { clients } from "@/data/sample";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Clients = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  return (
    <div className="space-y-8">
      <Helmet>
        <title>Clientes | Barber Manager</title>
        <meta name="description" content="Cadastro de clientes para histórico de vendas." />
        <link rel="canonical" href="/clients" />
      </Helmet>

      <h1 className="text-3xl font-semibold">Clientes</h1>

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
                  <TableHead>Telefone</TableHead>
                  <TableHead>E-mail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map(c => (
                  <TableRow key={c.id}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.phone}</TableCell>
                    <TableCell>{c.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Novo cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Nome" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
            <Input placeholder="Telefone" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} />
            <Input placeholder="E-mail" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} />
            <Button onClick={()=>toast({ title: "Cliente cadastrado (demo)", description: `${form.name} salvo apenas na sessão.` })}>Salvar</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Clients;
