import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Page } from "../components/Page";
import { fetchProducts, setProduct } from "../utils/api";
import { ReactComponent as Loader } from "../assets/images/loading.svg";
import { ProductList } from "../components/ProductList";
import { EmptyList } from "../components/EmptyList";
import { transformProducts } from "../utils/records";

export const AllItemsPage = () => {
  const [allCategories, setAllCategories] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await fetchProducts({ all: true });
      const allProducts = transformProducts(data);
      setAllCategories(allProducts);
      setLoading(false);
    };

    getProducts();
  }, []);

  const handleAddToList = (product) => {
    const { id, amount, category } = product;
    const oldCategories = { ...allCategories };
    allCategories[category] = allCategories[category].map((cat) => {
      return cat.id === id ? { ...cat, amount: amount ? 0 : 1 } : cat;
    });
    setProduct(id, amount ? 0 : 1).catch((err) => {
      setAllCategories(oldCategories);
    });
    setAllCategories({ ...allCategories });
  };

  return (
    <Page>
      {loading && (
        <Box display="flex" justifyContent="center" mt="1rem">
          <Loader height="50px" />
        </Box>
      )}

      {!loading && !Object.entries(allCategories).length && <EmptyList />}

      <Box bg="gray.800">
        <ProductList
          categories={allCategories}
          handleClick={handleAddToList}
          canManage={true}
        />
      </Box>
    </Page>
  );
};
