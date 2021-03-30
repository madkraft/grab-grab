import { ICategory } from "./records";
import { IProductResponse } from "./api";

export const isEmptyCategories = (listCategories: ICategory[]) => {
  if (listCategories.length) {
    return listCategories.every((cat) => cat.products.length === 0);
  }

  return listCategories.length === 0;
};

export const filterProducts = (products: IProductResponse[], query: string) => {
  return products.filter(({ name }) =>
    name.toLowerCase().includes(query.toLowerCase())
  );
};
