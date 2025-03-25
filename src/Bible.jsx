import { useSearch } from "./SearchContext";
import { useState, useEffect } from "react";
import { strokeColor } from "./constants";

export default function Bible() {
  const { bibleQuery, setBibleQuery } = useSearch();
  const [error, setError] = useState("");
  const { version, book, chapter } = useSearch();
  const { isLoading, setIsLoading } = useSearch();

  useEffect(() => {
    const controller = new AbortController();
    if (bibleQuery.trim() === "") {
      // setTrends([]);
      // localStorage.removeItem("trends");
      return;
    }
    async function fetchQuery() {
      // const API_KEY = "AIzaSyA_9QSamWQ-yBKdZCYbzI-ywkRy3fpGrWY";
      const URL = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/${version}/books/${book}/chapters/${chapter}.json`;

      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(
            ":) Something went wrong fetching your foundation, please try again."
          );
        }
        const data = await response.json();
        console.log(data);
        if (data.response === "False") {
          throw new Error(
            ":) Cannot find requested foundation, try another search."
          );
        }
        setTrends(data.items || []);
        localStorage.setItem("trends", JSON.stringify(data.items));
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
  }, [description, version, book, chapter]);
}

export function BibleSearch() {
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
