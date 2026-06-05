export interface SaleItem {
  product_id: number;
  quantity: number;
  unit_price?: number;
  subtotal?: number;
  product_name?: string;
}

export interface Sale {
  id?: number;
  client_id: number;
  client_name?: string;
  total?: number;
  status?: 'pending' | 'completed' | 'cancelled';
  items: SaleItem[];
  created_at?: string;
}
