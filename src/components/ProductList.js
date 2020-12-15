import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Product } from "./Product";
import { Category } from "./Category";
import { addProduct } from "../utils/api";
import { theme } from "../theme";

export const ProductList = ({ categories, canManage, handleClick }) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [newProduct, setNewProduct] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();

  const handleManageProducts = (category) => {
    setSelectedCategory(category);
    onOpen();
  };

  const handleAddProduct = (category) => {
    setNewProduct("");
    addProduct(newProduct, category).then(({ data }) => {
      window.location.reload();
    });
    onClose();
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

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader background="gray.600">{selectedCategory}</ModalHeader>
          <ModalCloseButton />
          <ModalBody background={theme.background}>
            <Box padding="1rem">
              <Input
                ref={initialRef}
                color="white"
                variant="outline"
                marginBottom="1rem"
                value={newProduct}
                onChange={(e) => {
                  setNewProduct(e.target.value);
                }}
              />
              <Button
                variant="outline"
                onClick={() => {
                  handleAddProduct(selectedCategory);
                }}
              >
                Add
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
