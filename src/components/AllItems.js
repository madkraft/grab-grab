import React from "react";

import { ProductList } from "./ProductList";

export const AllItems = ({ categories, addToList }) => {
  return (
    <>
      <ProductList
        categories={categories}
        canManage={true}
        handleClick={addToList}
      />
    </>
  );
};
