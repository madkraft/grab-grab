import React, { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { Product } from "./Product";
import { Category } from "./Category";
import { addProduct } from "../utils/api";

export const ProductList = ({ categories, canManage, handleClick }) => {
  const [manageMode, setManageMode] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  // const [productsList, setProductsList] = useState(categories);

  const handleManageProducts = () => {
    setManageMode(!manageMode);
  };

  const handleAddProduct = (category) => {
    setNewProduct("");
    addProduct(newProduct, category).then(({ data }) => {
      // setProductsList([{ id: data.id, ...data.fields }, ...productsList]);
    });
    setManageMode(false);
  };

  return (
    <>
      {Object.entries(categories).map(([category, products]) => {
        if (!products.length) {
          return null;
        }

        return (
          <Box key={category}>
            <Category
              category={category}
              canManage={canManage}
              manageProducts={handleManageProducts}
            />
            {manageMode && (
              <Box bg={"teal.400"} padding="1rem">
                <Input
                  color="white"
                  variant="outline"
                  marginBottom="1rem"
                  value={newProduct}
                  onChange={(e) => {
                    setNewProduct(e.target.value);
                  }}
                />
                <Button
                  onClick={() => {
                    handleAddProduct(category);
                  }}
                >
                  Add
                </Button>
              </Box>
            )}
            <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap="5px">
              {products.map((product) => (
                <Product
                  key={product.id}
                  {...product}
                  handleClick={() => handleClick(product)}
                />
              ))}
            </Box>
          </Box>
        );
      })}
    </>
  );
};
