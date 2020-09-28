import React from "react";
import { Box } from "@chakra-ui/core";

export const Category = ({ category }) => {
  return (
    <Box padding="0.5rem" color="gray.500" fontSize="xl">
      {category}
    </Box>
  );
};
