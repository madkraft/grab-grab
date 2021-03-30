import axios from "axios";

interface ICode {
  id: string;
  createdTime: string;
  fields: {
    name: string;
    attachment: {
      filename: string;
      id: string;
      size: number;
      type: string;
      url: string;
    }[];
  };
}

interface ICodesResponse {
  records: ICode[];
}

export interface IProductResponse {
  id: string;
  name: string;
  category: string;
  amount: number;
}

interface IProductsResponse {
  data: IProductResponse[];
}

export const fetchProducts = async (
  { all } = { all: false }
): Promise<IProductsResponse> => {
  const url = all
    ? `.netlify/functions/products-read-all`
    : `.netlify/functions/products-read-selected`;
  const { data } = await axios.get<IProductsResponse>(url);
  return data;
};

export const setProductAmount = async (id: string, amount: number) => {
  const url = `.netlify/functions/products-update`;
  return await axios.post(url, { id, amount });
};

export const setProductName = async (id: string, name: string) => {
  const url = `.netlify/functions/products-update`;
  return await axios.post(url, { id, name });
};

export const deleteProduct = async (id: string) => {
  const url = `.netlify/functions/products-delete`;
  return await axios.post(url, { id });
};

export const addProduct = async (productName: string, category: string) => {
  const url = `.netlify/functions/products-create`;
  return await axios.post(url, { name: productName, category, amount: 0 });
};

export const fetchCodes = async (): Promise<ICode[]> => {
  const url = `.netlify/functions/fetchCodes`;
  const { data } = await axios.get<ICodesResponse>(url);
  return data.records;
};
