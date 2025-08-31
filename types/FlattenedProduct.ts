export type FlattenedProduct = {
  id: string;
  markName: string;
  slug: string;
  name: string;
  description: string | null;
  price: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  images: string[];
  category?: string;
};
