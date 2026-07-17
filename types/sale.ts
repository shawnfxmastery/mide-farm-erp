export interface Sale {
  id: number;
  date: string;
  customer: string;
  crates: number;
  price_per_crate: number;
  total_amount: number;
  payment_status: string;
}