interface IProduct {
  id: string;
  productImageUrl: string | undefined;
  productName: string | undefined;
  quantity: number;
  unitPrice: number;
}

export interface ImportedData {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  dicountPercentage: boolean;
  isNew: boolean;
  tags: string[]
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
