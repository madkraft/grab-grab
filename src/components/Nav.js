import React from "react";
import { IconButton, Stack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { theme } from "../theme";
import { SearchIcon } from "@chakra-ui/icons";

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
  return (
    <Stack
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
      <RouterLink color={theme.teal} to="/">
        Grab
      </RouterLink>
      <RouterLink color={theme.orange} to="/all">
        All Items
      </RouterLink>

      <IconButton
        variant="ghost"
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        aria-label="Search product"
        icon={<SearchIcon />}
      />

      <RouterLink color={theme.white} to="/codes">
        Codes
      </RouterLink>
    </Stack>
  );
};
