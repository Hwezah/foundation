import { createContext, useState, useContext } from "react";
import { strokeColor } from "./constants";
const SearchContext = createContext();
export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }) {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SearchContext.Provider
      value={{
        description,
        setDescription,
        isLoading,
        setIsLoading,
        strokeColor,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
