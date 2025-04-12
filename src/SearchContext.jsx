import { createContext, useState, useContext } from "react";
import { strokeColor } from "./constants";
import { useLocalStorage } from "./Services/useLocalStorage";
const SearchContext = createContext();
export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }) {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trends, setTrends] = useLocalStorage([], "trends");
  const [selectedVideo, setSelectedVideo] = useState();
  const [bibleQuery, setBibleQuery] = useState("");
  const [isFeedVisible, setIsFeedVisible] = useState(false);
  const [error, setError] = useState("");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");

  return (
    <SearchContext.Provider
      value={{
        isFeedVisible,
        setIsFeedVisible,
        bibleQuery,
        setBibleQuery,
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
        verse,
        setVerse,
        chapter,
        setChapter,
        book,
        setBook,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
