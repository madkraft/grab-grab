import { Box, Button } from "@chakra-ui/core";
import React from "react";

export const EmptyList = () => {
  return (
    <Box mt="10rem" color="gray.500" fontSize="2xl" textAlign="center">
      All grabbed. Good job!
      <Button variantColor="teal" mt="2rem" padding="2rem" fontSize="xl">
        Add new items
      </Button>
    </Box>
  );
};
