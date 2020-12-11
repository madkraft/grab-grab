import React from "react";
import { Box } from "@chakra-ui/react";
import { CategoryProducts } from "./CategoryProducts";

export const ProductList = ({ categories, canManage, handleClick }) => {
  return (
    <>
      {Object.entries(categories).map(([category, products]) => {
        if (!products.length) {
          return null;
        }

        return (
          <Box key={category}>
            <CategoryProducts
              category={category}
              products={products}
              canManage={canManage}
              handleClick={handleClick}
            />
          </Box>
        );
      })}
    </>
  );
};
