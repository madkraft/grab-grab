export const transformProducts = (products) => {
  return products.reduce((acc, current) => {
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
