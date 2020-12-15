import React from "react";
import { Box } from "@chakra-ui/react";
import { EmptyList } from "./EmptyList";
import { ProductList } from "./ProductList";
import { ReactComponent as Loader } from "../assets/images/loading.svg";

export const List = ({ categories, loading, handleClick, canManage }) => {
  return (
    <Box bg="gray.800">
      {loading && (
        <Box display="flex" justifyContent="center" mt="1rem">
          <Loader height="50px" />
        </Box>
      )}

      {!loading && !Object.entries(categories).length && <EmptyList />}

      <ProductList
        categories={categories}
        handleClick={handleClick}
        canManage={canManage}
      />
    </Box>
  );
};
