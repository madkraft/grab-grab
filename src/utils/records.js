const getListProducts = (products) => {
  return products.filter((product) => product.fields.amount);
};

export const transformProducts = (products) => {
  let activeCategories = {};

  products.forEach(({ fields, id }) => {
    const { category } = fields;

    if (activeCategories[category]) {
      activeCategories[category] = [...activeCategories[category], { ...fields, id }];
    } else {
      activeCategories[category] = [{ ...fields, id }];
    }
  });

  return activeCategories;
};

export const getProducts = (products) => {
  const listProducts = getListProducts(products);

  return [transformProducts(products), transformProducts(listProducts)];
};
