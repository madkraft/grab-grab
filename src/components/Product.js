import React from "react";
import { Box } from "@chakra-ui/react";

export const Product = ({ name, amount, handleClick }) => {
  return (
    <Box
      bg={amount ? "teal.400" : "orange.400"}
      color="white"
      minHeight="0"
      minWidth="0"
      padding="0.5rem"
      textAlign="center"
      height={32}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      onClick={handleClick}
    >
      <Box fontSize="md">{name}</Box>
      {/* <Box fontSize="sm">{amount}</Box> */}
    </Box>
  );
};
