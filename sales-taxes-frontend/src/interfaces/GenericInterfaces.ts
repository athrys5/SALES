export interface Product {
  id?: number;
  name?: string;
  price?: number;
  category?: string;
  isImported?: boolean;
}

interface SingleProductReceipt {
  productName: string;
  quantity: number;
  totalPrice: number;
}

export interface Receipt {
  items: SingleProductReceipt[];
  totalTax: number;
  totalAmount: number;
}

export interface ReceiptRequest {
  productId: number;
  quantity: number;
}
