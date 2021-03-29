import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { AllItemsPage } from "./pages/AllItemsPage";
import { SelectedItemsPage } from "./pages/SelectedItemsPage";
import { CodesPage } from "./pages/CodesPage";
import { theme } from "./theme";

const globalTheme = extendTheme({
  styles: {
    global: {
      html: {
        height: "100%",
      },
      body: {
        bg: theme.background,
        color: theme.white,
        height: "100%",
      },
    },
  },
});

// <Typography /> */
const App = () => {
  return (
    <ChakraProvider theme={globalTheme}>
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <CodesPage />
          </Route>
          <Route path="/all" exact={true}>
            <AllItemsPage />
          </Route>
          <Route path="/grab" exact={true}>
            <SelectedItemsPage />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
};

export default App;
