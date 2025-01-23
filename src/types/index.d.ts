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
}

export interface ImportedData {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: strign;
  dicountPercentage: number;
  isNew: boolean;
  quantity?: number;
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
