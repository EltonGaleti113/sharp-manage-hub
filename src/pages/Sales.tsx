import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { products, services, clients } from "@/data/sample";
import { useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";

const currency = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

type Line = { id: string; type: "product" | "service"; refId?: string; qty: number };

const Sales = () => {
  const [clientId, setClientId] = useState<string | undefined>();
  const [lines, setLines] = useState<Line[]>([{ id: crypto.randomUUID(), type: "service", qty: 1 }]);

  const total = useMemo(() => {
    return lines.reduce((sum, l) => {
      const ref = l.type === "product" ? products.find(p=>p.id===l.refId) : services.find(s=>s.id===l.refId);
      const price = ref ? ("price" in ref ? ref.price : 0) : 0;
      return sum + (price * (l.qty || 0));
    }, 0);
  }, [lines]);

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Vendas | Barber Manager</title>
        <meta name="description" content="Registro de vendas com atualização de estoque (demo)." />
        <link rel="canonical" href="/sales" />
      </Helmet>

      <h1 className="text-3xl font-semibold">Registrar venda</h1>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-sm text-muted-foreground">Cliente (opcional)</label>
              <Select onValueChange={setClientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            {lines.map((l, idx) => (
              <div key={l.id} className="grid grid-cols-1 md:grid-cols-6 gap-3">
                <Select value={l.type} onValueChange={(v: "product"|"service")=>setLines(ls=>ls.map(x=>x.id===l.id?{...x,type:v,refId:undefined}:x))}>
                  <SelectTrigger className="md:col-span-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Serviço</SelectItem>
                    <SelectItem value="product">Produto</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={l.refId} onValueChange={(v)=>setLines(ls=>ls.map(x=>x.id===l.id?{...x,refId:v}:x))}>
                  <SelectTrigger className="md:col-span-3">
                    <SelectValue placeholder={l.type==='service'? 'Selecione o serviço':'Selecione o produto'} />
                  </SelectTrigger>
                  <SelectContent>
                    {(l.type==='service'?services:products).map(r => (
                      <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input type="number" min={1} value={l.qty} onChange={(e)=>setLines(ls=>ls.map(x=>x.id===l.id?{...x,qty:parseInt(e.target.value||'0',10)}:x))} className="md:col-span-1" />

                <Button variant="destructive" onClick={()=>setLines(ls=>ls.filter(x=>x.id!==l.id))}>Remover</Button>
              </div>
            ))}
            <Button variant="secondary" onClick={()=>setLines(ls=>[...ls,{ id: crypto.randomUUID(), type: "service", qty: 1 }])}>Adicionar item</Button>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-lg">Total</span>
            <strong className="text-2xl">{currency(total)}</strong>
          </div>

          <Button variant="hero" size="lg" onClick={()=>{
            toast({ title: "Venda registrada (demo)", description: `Total ${currency(total)}${clientId?` • Cliente: ${clients.find(c=>c.id===clientId)?.name}`:""}`});
          }}>Finalizar venda</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;
