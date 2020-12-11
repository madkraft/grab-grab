import React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Typography } from "./components/Typography";
import { GlobalStyles } from "./components/GlobalStyles";
import { Nav } from "./components/Nav";

const App = () => {
  return (
    <ChakraProvider resetCSS={true}>
      <CSSReset />
      <GlobalStyles />
      <Typography />
      <Nav />
    </ChakraProvider>
  );
};

export default App;
