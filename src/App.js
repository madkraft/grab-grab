import React, { useEffect, useState } from "react";
import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";
import axios from "axios";
import { Category } from "./components/Category";
import { Product } from "./components/Product";
import { Typography } from "./components/Typography";
import { GlobalStyles } from "./components/GlobalStyles";

var pStart = { x: 0, y: 0 };
var pStop = { x: 0, y: 0 };

function swipeStart(e) {
  if (typeof e["targetTouches"] !== "undefined") {
    var touch = e.targetTouches[0];
    pStart.x = touch.screenX;
    pStart.y = touch.screenY;
  } else {
    pStart.x = e.screenX;
    pStart.y = e.screenY;
  }
}

function swipeEnd(e) {
  if (typeof e["changedTouches"] !== "undefined") {
    var touch = e.changedTouches[0];
    pStop.x = touch.screenX;
    pStop.y = touch.screenY;
  } else {
    pStop.x = e.screenX;
    pStop.y = e.screenY;
  }

  swipeCheck();
}

function swipeCheck() {
  var changeY = pStart.y - pStop.y;
  var changeX = pStart.x - pStop.x;
  if (isPullDown(changeY, changeX)) {
    window.location.reload();
  }
}

function isPullDown(dY, dX) {
  // methods of checking slope, length, direction of line created by swipe action
  return dY < 0 && ((Math.abs(dX) <= 100 && Math.abs(dY) >= 200) || (Math.abs(dX) / Math.abs(dY) <= 0.3 && dY >= 60));
}

const getRecords = async () => {
  const url = `../.netlify/functions/airtable`;
  const { data } = await axios.get(url);
  return data.records;
};

const resetProduct = async (id) => {
  const url = `../.netlify/functions/resetProduct`;
  await axios.patch(url, { records: [{ id, fields: { amount: null } }] });
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
  // const [isEmpty, setIsEmpty] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const records = await getRecords();
      setCategories(transformProducts(records));
    };

    fetchProducts();

    document.addEventListener(
      "touchstart",
      function (e) {
        swipeStart(e);
      },
      false
    );
    document.addEventListener(
      "touchend",
      function (e) {
        swipeEnd(e);
      },
      false
    );
  }, []);

  // useEffect(() => {
  //   const activeLists = Object.values(categories).filter((products) => products.length);

  //   setIsEmpty(!activeLists.length);
  // }, [categories]);

  const handleClick = ({ category, name, id }) => {
    const res = categories[category].filter((cat) => cat.name !== name);
    categories[category] = res;

    setCategories({ ...categories });
    resetProduct(id);
  };

  return (
    <ThemeProvider>
      <CSSReset />
      <GlobalStyles />
      <Typography />
      <Box bg="gray.800">
        {/* {isEmpty && (
          <Box padding="4rem" color="gray.500" fontSize="2xl" textAlign="center">
            All grabbed. Good job!
          </Box>
        )} */}

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
