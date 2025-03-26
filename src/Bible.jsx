import { useSearch } from "./SearchContext";
import { useState, useEffect } from "react";
import { Loader } from "./trending";
import { strokeColor } from "./constants";

export default function Bible() {
  const { bibleQuery, setBibleQuery, isLoading, setIsLoading } = useSearch();
  const [error, setError] = useState("");

  useEffect(() => {
    const { version, book, chapter } = bibleQuery;
    const controller = new AbortController();
    if (bibleQuery.trim() === "") {
      return;
    }
    async function fetchQuery() {
      const URL = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/${version}/books/${book}/chapters/${chapter}.json`;

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
        setError("");
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
  }, [bibleQuery, setIsLoading, setBibleQuery]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <BibleFeed />}
      <BibleFeed />
    </>
  );
}

function BibleFeed({ className }) {
  const { bibleQuery } = useSearch();
  // if (!bibleQuery.book || !bibleQuery.chapter || !bibleQuery.verse) {
  //   return <p>No results found</p>; // No results or loading state
  // }
  console.log(bibleQuery.book);
  return (
    <div className={className}>
      <div className="leading-relaxed px-4 lg:px-6 xl:px-0 pb-4">
        <BibleSearch />
        <p>
          {bibleQuery.book} {bibleQuery.chapter}:{bibleQuery.verse} -{" "}
          {bibleQuery.text}
        </p>
      </div>
    </div>
  );
}

function BibleSearch() {
  const { bibleQuery, setBibleQuery } = useSearch();
  return (
    <div className="relative flex items-center ">
      <input
        value={bibleQuery}
        onChange={(e) => setBibleQuery(e.target.value)}
        className="flex flex-1 bg-transparent p-1 transition-all duration-300 font-bold text-gray-500 focus:outline-none"
        placeholder="Search by BibleVersion,Chapter,Verse..."
        style={{ caretShape: "bar", caret: "5px" }}
      />
      <button className="absolute top-1/2 right-6 -translate-y-1/2  py-2 text-white transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={strokeColor}
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010 17.5 7.5 7.5 0 0016.65 16.65z"
          />
        </svg>
      </button>
    </div>
  );
}
