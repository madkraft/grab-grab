import React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { theme } from "../theme";

export const Category = ({ category, canManage, manageProducts }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box padding="0.5rem" color="gray.500" fontSize="xl" userSelect="none">
        {category}
      </Box>
      {canManage && (
        <IconButton
          variant="ghost"
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          aria-label="Search product"
          color={theme.teal}
          icon={<AddIcon />}
          onClick={() => {
            manageProducts(category);
          }}
        />
      )}
    </Box>
  );
};
