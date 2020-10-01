import React from "react";
import { Box } from "@chakra-ui/core";
import { EmptyList } from "./EmptyList";
import { ProductList } from "./ProductList";
import { ReactComponent as Loader } from "../assets/images/loading.svg";

export const List = ({ categories, loading, removeProduct }) => {
  return (
    <Box bg="gray.800">
      {loading && (
        <Box display="flex" justifyContent="center" mt="1rem">
          <Loader height="50px" />
        </Box>
      )}

      {!Object.entries(categories).length && <EmptyList />}

      {Object.entries(categories).length && !Object.values(categories).filter((products) => products.length).length && <EmptyList />}

      <ProductList categories={categories} handleClick={removeProduct} />
    </Box>
  );
};
