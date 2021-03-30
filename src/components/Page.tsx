import { FC } from "react";
import { Box } from "@chakra-ui/react";

import { Nav } from "./Nav";

export const Page: FC = ({ children }) => {
  return (
    <>
      <Nav />
      <Box padding="0.1rem">{children}</Box>
    </>
  );
};
