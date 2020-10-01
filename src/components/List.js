import React from "react";
import { Box } from "@chakra-ui/core";
import { EmptyList } from "./EmptyList";
import { ProductList } from "./ProductList";

export const List = ({ categories, loading, removeProduct }) => {
  return (
    <Box bg="gray.800">
      {loading && (
        <Box fontSize="1.5rem" color="gray.500" textAlign="center">
          {/* add animation here */}
          Getting new items...
        </Box>
      )}

      {!Object.entries(categories).length && <EmptyList />}

      {Object.entries(categories).length && !Object.values(categories).filter((products) => products.length).length && <EmptyList />}

      <ProductList categories={categories} handleClick={removeProduct} />
    </Box>
  );
};
