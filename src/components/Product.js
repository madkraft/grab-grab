import React from "react";
import { Box } from "@chakra-ui/core";

export const Product = ({ name, amount, handleClick }) => {
  return (
    <Box
      bg="teal.400"
      color="white"
      padding="0.5rem"
      textAlign="center"
      height={32}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      onClick={handleClick}
    >
      <Box fontSize="xl">{name}</Box>
      <Box fontSize="sm">{amount}</Box>
    </Box>
  );
};
