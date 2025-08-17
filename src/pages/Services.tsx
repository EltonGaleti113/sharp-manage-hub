import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Service {
  id: string;
  name: string;
  price: number;
  cost: number;
}

const Services = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", price: "", cost: "" });

  const fetchServices = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar serviços",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, [user]);

  const handleSubmit = async () => {
    if (!user || !form.name || !form.price) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('services')
      .insert([
        {
          user_id: user.id,
          name: form.name,
          price: parseFloat(form.price),
          cost: parseFloat(form.cost) || 0,
        }
      ]);

    if (error) {
      toast({
        title: "Erro ao salvar serviço",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Serviço salvo!",
        description: `${form.name} foi adicionado aos serviços`,
      });
      setForm({ name: "", price: "", cost: "" });
      fetchServices();
    }
  };

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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">Carregando...</TableCell>
                  </TableRow>
                ) : services.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">Nenhum serviço cadastrado</TableCell>
                  </TableRow>
                ) : (
                  services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>R$ {service.price.toFixed(2)}</TableCell>
                      <TableCell>R$ {service.cost.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                )}
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
            <Button onClick={handleSubmit}>Salvar</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;
