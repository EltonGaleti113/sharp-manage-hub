import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { products } from "@/data/sample";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Products = () => {
  const [form, setForm] = useState({ name: "", category: "", unitCost: "", price: "", stock: "" });
  return (
    <div className="space-y-8">
      <Helmet>
        <title>Produtos | Barber Manager</title>
        <meta name="description" content="Cadastro e controle de estoque de produtos." />
        <link rel="canonical" href="/products" />
      </Helmet>

      <h1 className="text-3xl font-semibold">Produtos</h1>

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
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Estoque</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map(p => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.category}</TableCell>
                    <TableCell>{p.price.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</TableCell>
                    <TableCell>{p.stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Novo produto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Nome" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
            <Input placeholder="Categoria" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} />
            <Input placeholder="Custo unitário (R$)" value={form.unitCost} onChange={e=>setForm(f=>({...f,unitCost:e.target.value}))} />
            <Input placeholder="Preço de venda (R$)" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} />
            <Input placeholder="Estoque" value={form.stock} onChange={e=>setForm(f=>({...f,stock:e.target.value}))} />
            <Button onClick={()=>{
              toast({
                title: "Produto cadastrado (demo)",
                description: `${form.name} salvo apenas na sessão. Conecte o Supabase para persistir.`
              })
            }}>
              Salvar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Products;
