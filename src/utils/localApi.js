import axios from "axios";

export const localFetchRecords = async (all) => {
  const { data } = await axios.get(
    all
      ? process.env.REACT_APP_FETCH_ALL_URL
      : process.env.REACT_APP_FETCH_LIST_URL,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_NOT_SECRET_CODE}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data.records;
};

export const localFetchCodes = async () => {
  const { data } = await axios.get(process.env.REACT_APP_FETCH_CODES, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_NOT_SECRET_CODE}`,
      "Content-Type": "application/json",
    },
  });
  return data.records;
};

export const localAddProduct = async (productName, category) => {
  return await axios.post(
    process.env.REACT_APP_ADD_PRODUCT,
    {
      fields: { name: productName, category },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_NOT_SECRET_CODE}`,
        "Content-Type": "application/json",
      },
    }
  );
};
