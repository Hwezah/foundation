import { createContext, useState, useContext, useMemo } from "react";
import { strokeColor } from "./constants";
import { useLocalStorage } from "./Services/useLocalStorage";

const SearchContext = createContext();

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }) {
  const [description, setDescription] = useState("");
  const [trends, setTrends] = useLocalStorage([], "trends");
  const [selectedVideo, setSelectedVideo] = useState();
  const [isFeedVisible, setIsFeedVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added this line

  const value = useMemo(
    () => ({
      isFeedVisible,
      setIsFeedVisible,
      selectedVideo,
      setSelectedVideo,
      description,
      setDescription,
      isLoading,
      setIsLoading,
      strokeColor,
      trends,
      setTrends,
      error,
      setError,
    }),
    [
      isFeedVisible,
      selectedVideo,
      description,
      isLoading,
      trends,
      error,
      setTrends,
    ]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
