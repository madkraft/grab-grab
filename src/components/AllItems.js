import React from "react";
import { ProductList } from "./ProductList";

export const AllItems = ({ categories, addToList }) => {
  return <ProductList categories={categories} handleClick={addToList} />;
};
