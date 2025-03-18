import { createContext } from "react";
import { useContext } from "react";
export function useSearch() {
  return useContext(SearchContext);
}

export const strokeColor = "#fff";
export const SearchContext = createContext();
