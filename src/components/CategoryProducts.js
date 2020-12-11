import React, { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { Category } from "./Category";
import { Product } from "./Product";
import { addProduct } from "../utils/api";

export const CategoryProducts = ({
  category,
  products,
  canManage,
  handleClick,
}) => {
  const [manageMode, setManageMode] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  const [productsList, setProductsList] = useState(products);

  const handleManageProducts = () => {
    setManageMode(!manageMode);
  };

  const handleAddProduct = () => {
    setNewProduct("");
    addProduct(newProduct, category).then(({ data }) => {
      setProductsList([{ id: data.id, ...data.fields }, ...productsList]);
    });
    setManageMode(false);
  };

  return (
    <>
      <Category
        category={category}
        canManage={canManage}
        manageProducts={handleManageProducts}
      />

      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap="5px">
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
                handleAddProduct();
              }}
            >
              Add
            </Button>
          </Box>
        )}
        {productsList.map((product) => (
          <Product
            key={product.name}
            {...product}
            handleClick={() => handleClick(product)}
          />
        ))}
      </Box>
    </>
  );
};
