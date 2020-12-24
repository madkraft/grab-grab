import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { Page } from "../components/Page";
import { fetchProducts, setProductAmount } from "../utils/api";
import { transformProducts } from "../utils/records";
import { ReactComponent as Loader } from "../assets/images/loading.svg";
import { ProductList } from "../components/ProductList";
import { EmptyList } from "../components/EmptyList";
import { isEmptyCategories } from "../utils/utils";

export const SelectedItemsPage = () => {
  const [loading, setLoading] = useState(true);
  const [listCategories, setListCategories] = useState([]);

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
    const oldCategories = [...listCategories];

    const newCategories = listCategories.map((cat) => {
      if (cat.category === category) {
        const updatedProducts = cat.products.filter((prod) => prod.id !== id);

        return { ...cat, products: updatedProducts };
      }

      return cat;
    });

    setProductAmount(id, 0).catch((err) => {
      setListCategories(oldCategories);
    });
    setListCategories(newCategories);
  };

  return (
    <Page>
      {loading && (
        <Box display="flex" justifyContent="center" mt="1rem">
          <Loader height="50px" />
        </Box>
      )}

      {!loading && isEmptyCategories(listCategories) && <EmptyList />}

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
