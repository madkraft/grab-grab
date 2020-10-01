import { Box } from "@chakra-ui/core";
import React from "react";
import { Category } from "./Category";
import { Product } from "./Product";

export const ProductList = ({ categories, handleClick }) => {
  return (
    <>
      {Object.entries(categories).map(([category, products]) => {
        if (!products.length) {
          return null;
        }

        return (
          <Box key={category}>
            <Category category={category} />

            <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap="5px" padding="5px">
              {products.map((product) => (
                <Product key={product.name} {...product} handleClick={() => handleClick(product)} />
              ))}
            </Box>
          </Box>
        );
      })}
    </>
  );
};
