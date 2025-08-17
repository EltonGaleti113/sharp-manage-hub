import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Product {
  id: string;
  name: string;
  category: string;
  unit_cost: number;
  price: number;
  stock: number;
}

const Products = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", category: "", unitCost: "", price: "", stock: "" });

  const fetchProducts = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar produtos",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [user]);

  const handleSubmit = async () => {
    if (!user || !form.name || !form.category || !form.price) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('products')
      .insert([
        {
          user_id: user.id,
          name: form.name,
          category: form.category,
          unit_cost: parseFloat(form.unitCost) || 0,
          price: parseFloat(form.price),
          stock: parseInt(form.stock) || 0,
        }
      ]);

    if (error) {
      toast({
        title: "Erro ao salvar produto",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Produto salvo!",
        description: `${form.name} foi adicionado ao estoque`,
      });
      setForm({ name: "", category: "", unitCost: "", price: "", stock: "" });
      fetchProducts();
    }
  };
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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Carregando produtos...
                    </TableCell>
                  </TableRow>
                ) : products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Nenhum produto cadastrado
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                    </TableRow>
                  ))
                )}
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
            <Button onClick={handleSubmit}>
              Salvar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Products;
