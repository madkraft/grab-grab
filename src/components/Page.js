import React from "react";
import { Box } from "@chakra-ui/react";

import { Nav } from "./Nav";

export const Page = (props) => {
  return (
    <>
      <Nav />
      <Box padding="0.1rem">{props.children}</Box>
    </>
  );
};
