import React from "react";
import { Global, css } from "@emotion/core";

import font from "../assets/fonts/frenchfries.woff";

export const Typography = () => {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: FrenchFries;
          src: url(${font});
        }

        html {
          font-family: FrenchFries, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
            "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}
    />
  );
};
