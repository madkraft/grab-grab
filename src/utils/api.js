import axios from "axios";

export const fetchProducts = async ({ all } = { all: false }) => {
  const url = all
    ? `.netlify/functions/products-read-all`
    : `.netlify/functions/products-read-selected`;
  const { data } = await axios.get(url);
  return data;
};

export const setProduct = async (id, amount) => {
  const url = `.netlify/functions/products-update`;
  return await axios.post(url, { id, amount });
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
