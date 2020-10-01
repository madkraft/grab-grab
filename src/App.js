import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Typography } from "./components/Typography";
import { GlobalStyles } from "./components/GlobalStyles";
import { Nav } from "./components/Nav";

const App = () => {
  return (
    <ThemeProvider>
      <CSSReset />
      <GlobalStyles />
      <Typography />
      <Nav />
    </ThemeProvider>
  );
};

export default App;
