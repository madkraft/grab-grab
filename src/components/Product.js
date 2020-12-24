import React from "react";
import { Box } from "@chakra-ui/react";
import { theme } from "../theme";

export const Product = ({ name, amount, handleClick }) => {
  return (
    <Box
      borderWidth="3px"
      borderColor={amount ? theme.teal : theme.orange}
      borderRadius="1rem"
      background={amount ? theme.tealBackground : null}
      minHeight="0"
      minWidth="0"
      padding="0.2rem"
      textAlign="center"
      height={32}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box fontSize="md">{name}</Box>
    </Box>
  );
};
