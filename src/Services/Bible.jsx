import { useSearch } from "../SearchContext";
import { useState } from "react";
import { Loader } from "../trending";
import { strokeColor } from "../constants";

// bibleApi.js
const BASE_URL = "https://example-bible-api.com"; // Replace with actual API URL

const fetchBibleVerse = async (
  version,
  book,
  chapter,
  verse,
  setError,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    setError("");
    if (!version || !book || !chapter || !verse) {
      throw new Error(
        "All parameters (version, book, chapter, verse) are required"
      );
    }

    const response = await fetch(
      `${BASE_URL}/${version}/${book}/${chapter}/${verse}`
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Unable to fetch verse`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Bible API Error:", error.message);
    return { error: error.message };
  } finally {
    setIsLoading(false);
  }
};

// Bible Component
export default function Bible() {
  return (
    <div>
      <BibleSearch fetchBibleVerse={fetchBibleVerse} />
    </div>
  );
}

// BibleSearch Component
export const BibleSearch = ({ fetchBibleVerse }) => {
  // const [version, setVersion] = useState("");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { setIsLoading } = useSearch();

  const handleBibleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    if (!book || !chapter || !verse) {
      setError("Please fill in all fields");
      return;
    }

    const data = await fetchBibleVerse(book, chapter, verse);
    if (data.error) {
      setError(data.error);
    } else {
      setResult(data);
    }
  };

  return (
    <div className="flex justify-center p-4 gap-2">
      {/* <input
        className="focus:outline-none w-fit min-w-[100px]"
        type="text"
        placeholder="Version (e.g., KJV)"
        value={version}
        onChange={(e) => setVersion(e.target.value)}
      /> */}
      <input
        className="focus:outline-none w-fit min-w-[100px]"
        type="text"
        placeholder="Book"
        value={book}
        onChange={(e) => setBook(e.target.value)}
      />
      <input
        className="focus:outline-none w-[8ch] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        type="number"
        placeholder="Chapter"
        value={chapter}
        onChange={(e) => setChapter(e.target.value)}
      />
      <input
        className="focus:outline-none w-[6ch] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        type="number"
        placeholder="Verse"
        value={verse}
        onChange={(e) => setVerse(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleBibleSearch()}
      />
      <button onClick={handleBibleSearch}>
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && <p>{result.text}</p>}
    </div>
  );
};
