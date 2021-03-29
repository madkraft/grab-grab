export const isEmptyCategories = (listCategories) => {
  if (listCategories.length) {
    return listCategories.every((cat) => cat.products.length === 0);
  }

  return listCategories.length === 0;
};

export const filterProducts = (products, query) => {
  return products.filter(({ name }) =>
    name.toLowerCase().includes(query.toLowerCase())
  );
};
