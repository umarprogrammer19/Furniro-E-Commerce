import { BASE_URL } from "./baseUrl";

export interface ProductFromAPI {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  tags: string[];
  discountPercentage: number;
  isNew: boolean;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  products: ProductFromAPI[];
}

export async function getProducts(page: number = 1, limit: number = 100): Promise<ProductsResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/v2/products?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function getSingleProduct(productId: string): Promise<ProductFromAPI> {
  try {
    const response = await fetch(`${BASE_URL}/api/v2/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
}
