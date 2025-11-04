import { http } from "./http";

const BASE = "/Test";

export type Category = {
  id: string;
  name: string;
  slug: string;
  state: number;
  createdBy: string;
  approvedBy: string | null;
  createdAt: string;
  updatedAt: string | null;
  approvedAt: string | null;
  creator: any | null;
  approver: any | null;
  products: any[];
};

export const CategoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await http.get<Category[]>(`${BASE}/categories`);
    return response.data;
  },
};