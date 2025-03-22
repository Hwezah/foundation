import { createContext, useState, useContext } from "react";
import { strokeColor } from "./constants";
const SearchContext = createContext();
export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }) {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trends, setTrends] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  return (
    <SearchContext.Provider
      value={{
        selectedVideo,
        setSelectedVideo,
        description,
        setDescription,
        isLoading,
        setIsLoading,
        strokeColor,
        trends,
        setTrends,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
