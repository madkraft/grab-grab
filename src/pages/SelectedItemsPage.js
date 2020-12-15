import React, { useEffect, useState } from "react";

import { List } from "../components/List";
import { Page } from "../components/Page";
import { fetchRecords, setProduct } from "../utils/api";
import { getProducts } from "../utils/records";

export const SelectedItemsPage = () => {
  const [loading, setLoading] = useState(true);
  const [listCategories, setListCategories] = useState({});

  useEffect(() => {
    const getSelectedProducts = async () => {
      const records = await fetchRecords();
      const listProducts = getProducts(records);
      setListCategories(listProducts);
      setLoading(false);
    };

    getSelectedProducts();
  }, []);

  const handleRemoveProduct = (product) => {
    const { category, id } = product;

    listCategories[category] = listCategories[category].filter(
      (cat) => cat.id !== id
    );

    setProduct(id, null);
    setListCategories({ ...listCategories });
  };

  return (
    <Page>
      <List
        loading={loading}
        categories={listCategories}
        handleClick={handleRemoveProduct}
      />
    </Page>
  );
};
