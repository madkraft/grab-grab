import React from "react";
import { Stack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { theme } from "../theme";

const RouterLink = (props) => {
  return (
    <NavLink
      exact
      style={{
        display: "block",
        padding: "1rem",
        borderRadius: "1rem",
        borderWidth: "3px",
        borderColor: "transparent",
      }}
      activeStyle={{
        borderWidth: "3px",
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
      <RouterLink color={theme.white} to="/codes">
        Codes
      </RouterLink>
    </Stack>
  );
};
