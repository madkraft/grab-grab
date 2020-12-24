import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Page } from "../components/Page";
import { fetchProducts, setProductAmount } from "../utils/api";
import { ReactComponent as Loader } from "../assets/images/loading.svg";
import { ProductList } from "../components/ProductList";
import { EmptyList } from "../components/EmptyList";
import { transformProducts } from "../utils/records";

export const AllItemsPage = () => {
  const [allCategories, setAllCategories] = useState([]);
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
    const oldCategories = [...allCategories];
    const newCategories = allCategories.map((cat) => {
      if (cat.category === category) {
        const updatedProducts = cat.products.map((prod) => {
          return prod.id === id ? { ...prod, amount: amount ? 0 : 1 } : prod;
        });

        return { ...cat, products: updatedProducts };
      }

      return cat;
    });
    setAllCategories(newCategories);
    setProductAmount(id, amount ? 0 : 1).catch((err) => {
      setAllCategories(oldCategories);
    });
  };

  return (
    <Page>
      {loading && (
        <Box display="flex" justifyContent="center" mt="1rem">
          <Loader height="50px" />
        </Box>
      )}

      {!loading && !allCategories.length && <EmptyList />}

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
