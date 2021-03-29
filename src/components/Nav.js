import React, { useContext } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { isNil } from "lodash";
import { theme } from "../theme";
import { SearchContext } from "../contexts/SearchContext";

const RouterLink = (props) => {
  return (
    <NavLink
      exact
      style={{
        display: "block",
        padding: "0.5rem",
        borderRadius: "1rem",
        borderWidth: "2px",
        borderColor: "transparent",
      }}
      activeStyle={{
        borderWidth: "2px",
        borderColor: props.color,
        borderStyle: "solid",
      }}
      to={props.to}
    >
      {props.children}
    </NavLink>
  );
};

export const Nav = () => {
  const { searchedProduct, setSearchedProduct } = useContext(SearchContext);

  return (
    <Box>
      <Stack
        userSelect="none"
        fontSize="sm"
        spacing={4}
        direction="row"
        align="center"
        justify="center"
        padding="1rem 0"
        position="sticky"
        top="0"
        background={theme.background}
        zIndex="1"
      >
        <RouterLink color={theme.white} to="/">
          Codes
        </RouterLink>

        <RouterLink color={theme.orange} to="/all">
          All Items
        </RouterLink>

        <RouterLink color={theme.teal} to="/grab">
          Grab
        </RouterLink>
      </Stack>
      {!isNil(searchedProduct) && (
        <InputGroup size="md" padding="0 0.5rem">
          <Input
            color="white"
            variant="outline"
            marginBottom="1rem"
            value={searchedProduct}
            onChange={(e) => {
              setSearchedProduct(e.target.value);
            }}
            placeholder="Find a product"
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setSearchedProduct("")}
              background={theme.orange}
              _hover={{ bg: theme.orange }}
              _active={{ bg: theme.orange }}
            >
              Clear
            </Button>
          </InputRightElement>
        </InputGroup>
      )}
    </Box>
  );
};
