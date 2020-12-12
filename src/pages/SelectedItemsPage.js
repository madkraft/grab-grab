import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

import { List } from "../components/List";
import { Page } from "../components/Page";
import { fetchRecords, setProduct } from "../utils/api";
import { getProducts } from "../utils/records";

export const SelectedItemsPage = () => {
  const [listCategories, setListCategories] = useState({});

  useEffect(() => {
    const getSelectedProducts = async () => {
      const records = await fetchRecords();
      const listProducts = getProducts(records);
      setListCategories(listProducts);
    };

    getSelectedProducts();

    // const onSwipeDown = async () => {
    //   setLoading(true);
    //   const records = await fetchRecords({ all: false });
    //   setListCategories(transformProducts(records));
    //   setLoading(false);
    // };

    // document.addEventListener("touchstart", swipeStart, false);
    // document.addEventListener("touchend", swipeEnd(onSwipeDown), false);
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
      <List categories={listCategories} handleClick={handleRemoveProduct} />
      <Button
        width="100%"
        marginTop="1rem"
        variant="outline"
        onClick={() => {
          window.location.reload();
        }}
      >
        Reload
      </Button>
    </Page>
  );
};
