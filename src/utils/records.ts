import { IProductResponse } from "./api";

export interface ICategory {
  category: string;
  products: IProductResponse[];
}

export const transformProducts = (
  products: IProductResponse[]
): ICategory[] => {
  return products.reduce((acc: ICategory[], current: IProductResponse) => {
    const productsPerCategory = products.filter((filteredProduct) => {
      return filteredProduct.category === current.category;
    });

    if (acc.find((prod) => prod.category === current.category)) {
      return acc;
    }

    return [
      ...acc,
      {
        category: current.category,
        products: productsPerCategory,
      },
    ];
  }, []);
};
