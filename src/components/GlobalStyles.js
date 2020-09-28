import React from "react";
import { Global, css } from "@emotion/core";

import bg from "../assets/images/bg.svg";

export const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        html {
          background-image: url(${bg});
          background-size: 450px;
          background-attachment: fixed;
          background-color: #1a202c;
        }

        /* Scrollbar Styles */
        body::-webkit-scrollbar {
          width: 12px;
        }
        html {
          scrollbar-width: thin;
          scrollbar-color: var(--red) var(--white);
        }
        body::-webkit-scrollbar-track {
          background: var(--white);
        }
        body::-webkit-scrollbar-thumb {
          background-color: var(--red);
          border-radius: 6px;
          border: 3px solid var(--white);
        }
      `}
    />
  );
};
