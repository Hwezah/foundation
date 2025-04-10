import { useSearch } from "../SearchContext";
import { useState } from "react";
import { Loader } from "../trending";
import { strokeColor } from "../constants";

// API Function
const BASE_URL = "https://api.scripture.api.bible/v1/bibles";
const API_KEY = "2917b29dcc612336646fc8dd29282dbd";

const fetchBibleData = async (endpoint, setError, setIsLoading) => {
  try {
    // setIsLoading(true);
    setError(null);

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "api-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Unable to fetch data.`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Bible API Error:", error.message);
    setError(error.message);
    return null;
  } finally {
    setIsLoading(false);
  }
};

// Bible Component
export default function Bible() {
  return (
    <div>
      <BibleSearch fetchBibleData={fetchBibleData} />
    </div>
  );
}

// BibleSearch Component
export const BibleSearch = ({ fetchBibleData }) => {
  const [bibleId, setBibleId] = useState("de4e12af7f28f599-01"); // Default Bible ID (e.g., KJV)
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { setIsLoading } = useSearch();

  const handleBibleSearch = async () => {
    // setIsLoading(true);
    setError(null);
    setResult(null);

    if (!book || !chapter) {
      setError("Please provide both the book and chapter.");
      setIsLoading(false);
      return;
    }

    // Determine whether to query the chapter or a specific verse
    const verseId = verse
      ? `${book.toUpperCase()}.${chapter}.${verse}` // Format: BOOK.CHAPTER.VERSE
      : `${book.toUpperCase()}.${chapter}`; // Format: BOOK.CHAPTER (for chapter-only search)

    const endpoint = verse
      ? `${BASE_URL}/${bibleId}/verses/${verseId}`
      : `${BASE_URL}/${bibleId}/chapters/${verseId}`; // Use chapters endpoint if no verse is provided

    const data = await fetchBibleData(endpoint, setError, setIsLoading);
    if (data && !data.error) {
      const cleanContent = data.data.content.replace(/<[^>]*>/g, ""); // Regex to remove HTML tags
      setResult({ ...data.data, content: cleanContent });
    }
  };

  return (
    <div className=" p-4 pt-2 gap-4">
      {/* Book, Chapter, and Verse Inputs */}
      <form
        className="flex gap-2 justify-end"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent the default form submission behavior
          handleBibleSearch(); // Trigger the search
        }}
      >
        <input
          className="bg-[#022b3a] border-none focus:outline-none w-fit min-w-[100px] border rounded px-2"
          type="text"
          placeholder="Book (e.g., GEN)"
          value={book}
          onChange={(e) => setBook(e.target.value)}
        />
        <input
          className="appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [moz-appearance:textfield] bg-[#022b3a] border-none focus:outline-none w-[8ch] border border-gray-300 rounded px-2 appearance-none"
          type="number"
          placeholder="Chapter"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
        />
        <input
          className="appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [moz-appearance:textfield] bg-[#022b3a] border-none focus:outline-none w-[6ch] border border-gray-300 rounded px-2 appearance-none"
          type="number"
          placeholder="Verse"
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
        />
        <button
          type="submit" // Set the button type to "submit"
          className="bg-[#4a5759] text-white px-4 py-0.5 lg:py-1 rounded hover:bg-[#3b4647]"
        >
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Result */}
      {result && (
        <div className=" mt-1">
          <h3 className="text-lg font-bold">{result.reference}</h3>
          <p className="text-gray-200">
            {verse ? (
              <>
                <span className="font-bold">
                  {result.content.split(/(\d+)/)[1]}.
                </span>
                {result.content.split(/(\d+)/)[2]}
              </>
            ) : (
              result.content
            )}
          </p>
        </div>
      )}
    </div>
  );
};
