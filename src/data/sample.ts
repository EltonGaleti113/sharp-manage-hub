export type Product = {
  id: string;
  name: string;
  category: string;
  unitCost: number;
  price: number;
  stock: number;
};

export type Service = {
  id: string;
  name: string;
  price: number;
  cost?: number;
};

export type Client = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
};

export type SaleItem = {
  type: "product" | "service";
  id: string;
  quantity: number;
};

export const products: Product[] = [
  { id: "p1", name: "Pomada Modeladora", category: "pomada", unitCost: 12, price: 35, stock: 18 },
  { id: "p2", name: "Shampoo Clássico", category: "shampoo", unitCost: 10, price: 29, stock: 6 },
  { id: "p3", name: "Condicionador Forte", category: "condicionador", unitCost: 11, price: 32, stock: 3 },
];

export const services: Service[] = [
  { id: "s1", name: "Corte Simples", price: 35, cost: 2 },
  { id: "s2", name: "Barba", price: 30, cost: 1.5 },
  { id: "s3", name: "Combo Corte + Barba", price: 60, cost: 3 },
];

export const clients: Client[] = [
  { id: "c1", name: "João Silva", phone: "(11) 99999-1111", email: "joao@example.com" },
  { id: "c2", name: "Maria Souza", phone: "(11) 98888-2222", email: "maria@example.com" },
];

export const sampleRevenueSeries = [
  { date: "2025-07-31", revenue: 240, cost: 60 },
  { date: "2025-08-01", revenue: 420, cost: 95 },
  { date: "2025-08-02", revenue: 360, cost: 78 },
  { date: "2025-08-03", revenue: 510, cost: 110 },
  { date: "2025-08-04", revenue: 460, cost: 98 },
];
