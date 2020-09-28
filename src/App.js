import React, { useEffect, useState } from "react";
import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";
import axios from "axios";
import { Category } from "./components/Category";
import { Product } from "./components/Product";
import { Typography } from "./components/Typography";
import { GlobalStyles } from "./components/GlobalStyles";

const apiKey = "";
const baseId = "";

const getRecords = async () => {
  const table = "products";
  const nonEmpty = "NOT({amount} = '')";
  const url = `https://api.airtable.com/v0/${baseId}/${table}?view=all&filterByFormula=${nonEmpty}`;
  const { data } = await axios.get(url, { headers: { Authorization: `Bearer ${apiKey}` } });
  return data.records;
};

const resetProduct = async (id) => {
  const table = "products";
  const url = `https://api.airtable.com/v0/${baseId}/${table}`;
  await axios.patch(
    url,
    { records: [{ id, fields: { amount: null } }] },
    { headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" } }
  );
};

const transformProducts = (products) => {
  let activeCategories = {};

  products.forEach(({ fields, id }) => {
    const { category } = fields;

    if (activeCategories[category]) {
      activeCategories[category] = [...activeCategories[category], { ...fields, id }];
    } else {
      activeCategories[category] = [{ ...fields, id }];
    }
  });

  return activeCategories;
};

function App() {
  const [categories, setCategories] = useState({});
  const [isEmpty, setIsEmpty] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const records = await getRecords();
      setIsLoading(false);
      setCategories(transformProducts(records));
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const activeLists = Object.values(categories).filter((products) => products.length);

    if (Object.keys(categories).length === 0) {
      setIsLoading(true);

      return;
    }

    setIsEmpty(!activeLists.length);
  }, [categories]);

  const handleClick = ({ category, name, id }) => {
    const res = categories[category].filter((cat) => cat.name !== name);

    setCategories({
      ...categories,
      [category]: res
    });

    resetProduct(id);
  };

  return (
    <ThemeProvider>
      <CSSReset />
      <GlobalStyles />
      <Typography />
      <Box bg="gray.800">
        {isLoading && (
          <Box padding="4rem" color="gray.500" fontSize="2xl" textAlign="center">
            Loading...
          </Box>
        )}
        {isEmpty && (
          <Box padding="4rem" color="gray.500" fontSize="2xl" textAlign="center">
            Good job!
          </Box>
        )}

        {Object.entries(categories).map(([category, products]) => {
          if (!products.length) {
            return null;
          }

          return (
            <Box key={category}>
              <Category category={category} />

              <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap="5px" padding="5px">
                {products.map((product) => (
                  <Product key={product.name} {...product} handleClick={() => handleClick(product)} />
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    </ThemeProvider>
  );
}

export default App;
