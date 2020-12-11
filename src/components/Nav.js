import React, { useEffect, useState } from "react";
import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { List } from "./List";
import { AllItems } from "./AllItems";
import { fetchRecords, setProduct } from "../utils/api";
// import { swipeEnd, swipeStart } from "../utils/swipe";
import { getProducts } from "../utils/records";
import { Codes } from "./Codes";

export const Nav = () => {
  const [allCategories, setAllCategories] = useState({});
  const [listCategories, setListCategories] = useState({});
  const [loading] = useState(false);

  useEffect(() => {
    const getAllProducts = async () => {
      const records = await fetchRecords();
      const [allProducts, listProducts] = getProducts(records);
      setAllCategories(allProducts);
      setListCategories(listProducts);
    };

    getAllProducts();

    // const onSwipeDown = async () => {
    //   setLoading(true);
    //   const records = await fetchRecords({ all: false });
    //   setListCategories(transformProducts(records));
    //   setLoading(false);
    // };

    // document.addEventListener("touchstart", swipeStart, false);
    // document.addEventListener("touchend", swipeEnd(onSwipeDown), false);
  }, []);

  const setNewListCategoryAmount = (product, amount) => {
    const { category, id } = product;

    if (amount) {
      listCategories[category] = listCategories[category]
        ? [...listCategories[category], { ...product, amount }]
        : [{ ...product, amount: 1 }];
    } else {
      listCategories[category] = listCategories[category].filter(
        (cat) => cat.id !== id
      );
    }

    return { ...listCategories };
  };

  const setNewAllCategoryAmount = (product, amount) => {
    const { category, id } = product;

    const updatedCategory = allCategories[category].map((cat) => {
      return cat.id === id ? { ...cat, amount } : cat;
    });

    allCategories[category] = updatedCategory;

    return { ...allCategories };
  };

  const handleRemoveProduct = (product) => {
    const { category, id } = product;

    listCategories[category] = listCategories[category].filter(
      (cat) => cat.id !== id
    );
    const newAllCategories = setNewAllCategoryAmount(product, 0);

    setProduct(id, null);
    setListCategories({ ...listCategories });
    setAllCategories(newAllCategories);
  };

  const handleAddToList = (product) => {
    const { id, amount } = product;

    const newListCategories = setNewListCategoryAmount(
      product,
      amount ? null : 1
    );
    const newAllCategories = setNewAllCategoryAmount(
      product,
      amount ? null : 1
    );

    setProduct(id, amount ? null : 1);
    setListCategories(newListCategories);
    setAllCategories(newAllCategories);
  };

  return (
    <Tabs variant="soft-rounded" color="white">
      <TabList justifyContent="center" paddingY="1rem" bg="#1a202c">
        <Tab _selected={{ color: "white", bg: "teal.400" }}>Grab</Tab>
        <Tab _selected={{ color: "white", bg: "orange.400" }}>All Items</Tab>
        <Tab>Codes</Tab>
      </TabList>

      <TabPanels bg="#1a202c">
        <TabPanel padding="0.1rem">
          <List
            categories={listCategories}
            loading={loading}
            removeProduct={handleRemoveProduct}
          />
          <Button
            width="100%"
            marginTop="1rem"
            variant="outline"
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload
          </Button>
        </TabPanel>
        <TabPanel padding="0.1rem">
          <AllItems categories={allCategories} addToList={handleAddToList} />
          <Button
            width="100%"
            marginTop="1rem"
            variant="outline"
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload
          </Button>
        </TabPanel>
        <TabPanel padding="0.1rem">
          <Codes />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
