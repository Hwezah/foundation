import { useSearch } from "./SearchContext";
import { useState, useEffect } from "react";
import { Feed } from "./foundationUtilities";
import { Loader } from "./trending";

export default function Bible() {
  const {
    bibleQuery,
    setBibleQuery,
    version,
    book,
    chapter,
    isLoading,
    setIsLoading,
  } = useSearch();
  const [error, setError] = useState("");

  useEffect(() => {
    const { version, book, chapter } = bibleQuery;
    const controller = new AbortController();
    // if (bibleQuery.trim() === "") {

    //   return;
    // }
    async function fetchQuery() {
      // const API_KEY = "AIzaSyA_9QSamWQ-yBKdZCYbzI-ywkRy3fpGrWY";
      const URL = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/${"en-kjv"}/books/${"matthew"}/chapters/${1}.json`;

      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(
            ":) Something went wrong fetching your search, please try again."
          );
        }
        const data = await response.json();
        console.log(data);
        if (data && data.data) {
          // For example, set the first verse data to the state
          setBibleQuery({
            book: data.data.book,
            chapter: data.data.chapter,
            verse: data.data.verse,
            text: data.data.text,
          });
          // This hook will run whenever bibleQuery changes
        } else {
          throw new Error(":) Cannot find your request, try another search.");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuery();
    return () => {
      controller.abort();
    };
  }, [version, book, chapter, setIsLoading, setBibleQuery]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <Feed />}
      <Feed />
    </>
  );
}
