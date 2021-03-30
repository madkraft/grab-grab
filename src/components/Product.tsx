import { FC } from "react";
import { Box } from "@chakra-ui/react";
import { theme } from "../theme";

interface IProductProps {
  name: string;
  amount?: number;
}

export const Product: FC<IProductProps> = ({ name, amount }) => {
  return (
    <Box
      borderWidth="3px"
      borderColor={amount ? theme.teal : theme.orange}
      borderRadius="1rem"
      background={amount ? theme.tealBackground : ""}
      minHeight="0"
      minWidth="0"
      padding="0.2rem"
      textAlign="center"
      height={32}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      onContextMenu={() => false}
    >
      <Box fontSize="md" userSelect="none" onContextMenu={() => false}>
        {name}
      </Box>
    </Box>
  );
};
