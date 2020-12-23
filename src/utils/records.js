export const transformProducts = (products) => {
  let activeCategories = {};

  products.forEach((product) => {
    const { category } = product;

    if (activeCategories[category]) {
      activeCategories[category] = [...activeCategories[category], product];
    } else {
      activeCategories[category] = [product];
    }
  });

  return activeCategories;
};
