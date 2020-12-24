export const isEmptyCategories = (listCategories) => {
  if (listCategories.length) {
    return listCategories.every((cat) => cat.products.length === 0);
  }

  return listCategories.length === 0;
};
