import React, { useEffect, useState } from "react";
import { List } from "../components/List";
import { Page } from "../components/Page";
import { fetchRecords, setProduct } from "../utils/api";
import { getAllProducts } from "../utils/records";

export const AllItemsPage = () => {
  const [allCategories, setAllCategories] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      const records = await fetchRecords({ all: true });
      const allProducts = getAllProducts(records);
      setAllCategories(allProducts);
    };

    getProducts();
  }, []);

  const handleAddToList = (product) => {
    const { id, amount, category } = product;

    allCategories[category] = allCategories[category].map((cat) => {
      return cat.id === id ? { ...cat, amount: amount ? null : 1 } : cat;
    });

    setProduct(id, amount ? null : 1);
    setAllCategories({ ...allCategories });
  };

  return (
    <Page>
      <List
        categories={allCategories}
        handleClick={handleAddToList}
        canManage={true}
      />
    </Page>
  );
};
