import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { Page } from "../components/Page";
import { fetchProducts, setProduct } from "../utils/api";
import { transformProducts } from "../utils/records";
import { ReactComponent as Loader } from "../assets/images/loading.svg";
import { ProductList } from "../components/ProductList";
import { EmptyList } from "../components/EmptyList";

export const SelectedItemsPage = () => {
  const [loading, setLoading] = useState(true);
  const [listCategories, setListCategories] = useState({});

  useEffect(() => {
    const getSelectedProducts = async () => {
      const { data } = await fetchProducts();
      const listProducts = transformProducts(data);
      setListCategories(listProducts);
      setLoading(false);
    };

    getSelectedProducts();
  }, []);

  const handleRemoveProduct = (product) => {
    const { category, id } = product;
    const oldCategories = { ...listCategories };

    listCategories[category] = listCategories[category].filter(
      (cat) => cat.id !== id
    );

    setProduct(id, 0).catch((err) => {
      setListCategories(oldCategories);
    });
    setListCategories({ ...listCategories });
  };

  return (
    <Page>
      {loading && (
        <Box display="flex" justifyContent="center" mt="1rem">
          <Loader height="50px" />
        </Box>
      )}

      {!loading && !Object.entries(listCategories).length && <EmptyList />}

      <Box bg="gray.800">
        <ProductList
          categories={listCategories}
          handleClick={handleRemoveProduct}
          canManage={false}
        />
      </Box>
    </Page>
  );
};
