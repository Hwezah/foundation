import { createContext, useContext } from "react";
export function useSearch() {
  return useContext(SearchContext);
}

export const strokeColor = "#fff";
export const SearchContext = createContext();
