interface IProduct {
  id: string;
  productImageUrl: string | undefined;
  productName: string | undefined;
  quantity: number;
  unitPrice: number;
}

export interface ICart {
  _id: string;
  title: string;
  imageUrl: string;
  quantity: number;
  price: number;
  stock?: number; // Added to track available stock
}

export interface ImportedData {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
  discountPercentage: number; // Fixed typo from dicountPercentage
  isNew: boolean;
  quantity?: number;
  tags: string[];
  stock: number; // Added stock field
}


interface IResponse {
  response: {
    data: any;
  };
}

interface IProductInput {
  id: string;
  qty: number;
}
