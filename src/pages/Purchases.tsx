import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { products } from "@/data/sample";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const Purchases = () => {
  const [form, setForm] = useState({ productId: "", qty: "", paid: "" });
  return (
    <div className="space-y-8">
      <Helmet>
        <title>Compras | Barber Manager</title>
        <meta name="description" content="Registro de compras de estoque e custo médio (demo)." />
        <link rel="canonical" href="/purchases" />
      </Helmet>

      <h1 className="text-3xl font-semibold">Registrar compra de estoque</h1>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Select value={form.productId} onValueChange={(v)=>setForm(f=>({...f,productId:v}))}>
            <SelectTrigger>
              <SelectValue placeholder="Produto" />
            </SelectTrigger>
            <SelectContent>
              {products.map(p => (
                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input placeholder="Quantidade" value={form.qty} onChange={e=>setForm(f=>({...f,qty:e.target.value}))} />
          <Input placeholder="Valor pago total (R$)" value={form.paid} onChange={e=>setForm(f=>({...f,paid:e.target.value}))} />
          <Button variant="hero" onClick={()=>{
            const prod = products.find(p=>p.id===form.productId)?.name ?? "Produto";
            toast({ title: "Compra registrada (demo)", description: `${form.qty}x ${prod} por R$ ${form.paid}`})
          }}>Salvar</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Purchases;
