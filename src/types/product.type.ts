export interface GetResponseProduct {
  data: ProductState[];
  status: number;
  error: {};
}

export interface ProductState {
  name: string;
  description: string;
  price: number;
}
