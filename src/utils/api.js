import axios from "axios";
import {
  localAddProduct,
  localFetchCodes,
  localFetchRecords,
} from "./localApi";

export const fetchRecords = async ({ all } = { all: false }) => {
  if (process.env.NODE_ENV === "development") {
    return localFetchRecords(all);
  }

  const url = all
    ? `../.netlify/functions/fetchAllProducts`
    : `../.netlify/functions/fetchListProducts`;
  const { data } = await axios.get(url);
  return data.records;
};

export const setProduct = async (id, amount) => {
  if (process.env.NODE_ENV === "development") {
    return;
  }
  const url = `../.netlify/functions/resetProduct`;
  await axios.patch(url, { records: [{ id, fields: { amount } }] });
};

export const addProduct = async (productName, category) => {
  if (process.env.NODE_ENV === "development") {
    return localAddProduct(productName, category);
  }
  const url = `../.netlify/functions/addProduct`;
  return await axios.post(url, {
    fields: { name: productName, category },
  });
};

export const fetchCodes = async () => {
  if (process.env.NODE_ENV === "development") {
    return localFetchCodes();
  }

  const url = `../.netlify/functions/fetchCodes`;
  const { data } = await axios.get(url);
  return data.records;
};
