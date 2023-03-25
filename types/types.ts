import { products } from "@prisma/client";

export type Products = (products & {
  discount: {
    discount: number;
  } | null;
  images: {
    image: string;
  }[];
  category: {
    id: number;
    name: string;
  };
})[];

export type Product = Products[0];
