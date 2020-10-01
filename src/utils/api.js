import axios from "axios";

const allProducts = [
  {
    id: 1,
    fields: {
      category: "Test category",
      name: "test product",
      amount: 1
    }
  },
  {
    id: 2,
    fields: {
      category: "Test category",
      name: "test product 2"
    }
  },
  {
    id: 2,
    fields: {
      category: "Test category 2",
      name: "test product 3"
    }
  }
];

const listProducts = [
  {
    id: 1,
    fields: {
      category: "Test category",
      name: "test product",
      amount: 1
    }
  }
];

export const fetchRecords = async ({ all } = { all: true }) => {
  if (process.env.NODE_ENV === "development") {
    return all ? allProducts : listProducts;
  }

  const url = all ? `../.netlify/functions/fetchAllProducts` : `../.netlify/functions/fetchListProducts`;
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
