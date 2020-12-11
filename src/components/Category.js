import React from "react";
import { Box, Button } from "@chakra-ui/react";

export const Category = ({ category, canManage, manageProducts }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box padding="0.5rem" color="gray.500" fontSize="xl">
        {category}
      </Box>
      {canManage && (
        <Button
          color="white"
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          variant="ghost"
          onClick={() => {
            manageProducts();
          }}
        >
          Edit
        </Button>
      )}
    </Box>
  );
};
