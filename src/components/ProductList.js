import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
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
import { addProduct, deleteProduct, setProductName } from "../utils/api";
import { theme } from "../theme";
import { EditIcon } from "@chakra-ui/icons";

export const ProductList = ({ categories, canManage, handleClick }) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [newProduct, setNewProduct] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const initialRef = React.useRef();

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setNewProduct(product.name);
    onEditOpen();
  };

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

  const handleEditProduct = (selectedProductId) => {
    setProductName(selectedProductId, newProduct)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error updating", err);
      });
    setNewProduct("");
    onEditClose();
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId).then(() => {
      window.location.reload();
    });
    onEditClose();
  };

  return (
    <>
      {categories.map(({ category, products }) => {
        if (!products?.length) {
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
                <Box key={product.id} position="relative">
                  <Box onClick={() => handleClick(product)}>
                    <Product {...product} />
                  </Box>
                  {canManage && (
                    <IconButton
                      aria-label="Edit product"
                      icon={<EditIcon />}
                      size="xs"
                      position="absolute"
                      top="10px"
                      right="10px"
                      _hover={{ bg: "transparent" }}
                      _active={{ bg: "transparent" }}
                      variant="ghost"
                      onClick={() => openEditModal(product)}
                    ></IconButton>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        );
      })}

      <Modal
        isOpen={isEditOpen}
        onClose={onEditClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader background="gray.600">Edit product name</ModalHeader>
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
              <Box display="flex" justifyContent="space-between">
                <Button
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  variant="outline"
                  onClick={() => {
                    handleEditProduct(selectedProduct.id);
                  }}
                >
                  Save
                </Button>
                <Button
                  colorScheme="red"
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  variant="outline"
                  onClick={() => {
                    handleDeleteProduct(selectedProduct.id);
                  }}
                >
                  Delete product
                </Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

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
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
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
