import { createContext, useState, useContext, useMemo } from "react";
import { strokeColor } from "./constants";
import { useLocalStorage } from "./Services/useLocalStorage";

const SearchContext = createContext();

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

export function SearchProvider({ children }) {
  const [query, setquery] = useState("");
  const [sermons, setSermons] = useLocalStorage([], "sermons");
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
      query,
      setquery,
      isLoading,
      setIsLoading,
      strokeColor,
      sermons,
      setSermons,
      error,
      setError,
    }),
    [isFeedVisible, selectedVideo, query, isLoading, sermons, error, setSermons]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
