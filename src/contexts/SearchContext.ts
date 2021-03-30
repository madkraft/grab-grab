import { createContext, Dispatch, SetStateAction } from "react";

interface ISearchContext {
  searchedProduct: string;
  setSearchedProduct: Dispatch<SetStateAction<string>>;
}

export const SearchContext = createContext<ISearchContext>({
  searchedProduct: "",
  setSearchedProduct: () => {},
});
