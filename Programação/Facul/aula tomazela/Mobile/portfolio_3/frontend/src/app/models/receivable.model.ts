export interface Receivable {
  id: number;
  sale_id: number;
  client_id: number;
  client_name?: string;
  amount: number;
  due_date: string;
  paid_at?: string;
  status: 'open' | 'paid' | 'overdue';
}
