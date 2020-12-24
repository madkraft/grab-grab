import axios from "axios";

export const fetchProducts = async ({ all } = { all: false }) => {
  const url = all
    ? `.netlify/functions/products-read-all`
    : `.netlify/functions/products-read-selected`;
  const { data } = await axios.get(url);
  return data;
};

export const setProductAmount = async (id, amount) => {
  const url = `.netlify/functions/products-update`;
  return await axios.post(url, { id, amount });
};

export const setProductName = async (id, name) => {
  const url = `.netlify/functions/products-update`;
  return await axios.post(url, { id, name });
};

export const deleteProduct = async (id) => {
  const url = `.netlify/functions/products-delete`;
  return await axios.post(url, { id });
};

export const addProduct = async (productName, category) => {
  const url = `.netlify/functions/products-create`;
  return await axios.post(url, { name: productName, category, amount: 0 });
};

export const fetchCodes = async () => {
  const url = `.netlify/functions/fetchCodes`;
  const { data } = await axios.get(url);
  return data.records;
};
