import { SizeOption } from "./Product";

export interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  sizeOptions: SizeOption[];
  note: string;
  price: number;
  cost: number;
}
