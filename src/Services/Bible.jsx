import { useSearch } from "../SearchContext";
import { useState } from "react";
import { Loader } from "../trending";
import { strokeColor } from "../constants";

const BASE_URL = "https://api.scripture.api.bible/v1/bibles";
const API_KEY = "2917b29dcc612336646fc8dd29282dbd";

const fetchBibleData = async (endpoint, setError, setIsLoading) => {
  try {
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

function BibleDisplay({ result, isVerseByVerse }) {
  return (
    <div className="bible-display">
      <div className="mt-1 px-2">
        <h3 className="text-lg font-bold text-blue-400">{result.reference}</h3>
        <p className="text-gray-200">
          {result.content
            .split(/(?=\b\d{1,3}[^a-zA-Z0-9]*[A-Z])/)
            .map((part, index) => {
              const match = part.match(/^(\d{1,3})([^a-zA-Z0-9]*)([A-Z].*)/);
              if (!match) return <span key={index}>{part}</span>;

              const [, verseNum, symbol, verseText] = match;

              return (
                <span
                  key={index}
                  className={isVerseByVerse ? "block mb-1" : "inline"}
                >
                  <span className="text-xs text-blue-400 mr-1 font-semibold">
                    {verseNum}.
                  </span>
                  <span className="text-gray-400">{symbol}</span>
                  {verseText + " "}
                </span>
              );
            })}
        </p>
      </div>
    </div>
  );
}
function BibleDisplayToggle({ isVerseByVerse, toggleDisplayStyle }) {
  return (
    <button
      onClick={toggleDisplayStyle}
      className="bg-[#022b3a] text-white px-2 py-0.5 lg:py-1 rounded "
    >
      {isVerseByVerse ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#fff"
          className="w-5 h-5"
        >
          <path
            d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

export default function Bible() {
  return (
    <div>
      <BibleSearch fetchBibleData={fetchBibleData} />
    </div>
  );
}

export const BibleSearch = ({ fetchBibleData }) => {
  const [bibleId, setBibleId] = useState("de4e12af7f28f599-01");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { setIsLoading } = useSearch();
  const [isVerseByVerse, setIsVerseByVerse] = useState(false);
  const toggleDisplayStyle = () => setIsVerseByVerse((prev) => !prev);
  // Top of the BibleSearch.js or Bible.js file

  const books = {
    GEN: "Genesis",
    EXO: "Exodus",
    LEV: "Leviticus",
    NUM: "Numbers",
    DEU: "Deuteronomy",
    JOS: "Joshua",
    JDG: "Judges",
    RUT: "Ruth",
    "1SA": "1 Samuel",
    "2SA": "2 Samuel",
    "1KI": "1 Kings",
    "2KI": "2 Kings",
    "1CH": "1 Chronicles",
    "2CH": "2 Chronicles",
    EZR: "Ezra",
    NEH: "Nehemiah",
    EST: "Esther",
    JOB: "Job",
    PSA: "Psalms",
    PRO: "Proverbs",
    ECC: "Ecclesiastes",
    SNG: "Song of Solomon",
    ISA: "Isaiah",
    JER: "Jeremiah",
    LAM: "Lamentations",
    EZK: "Ezekiel",
    DAN: "Daniel",
    HOS: "Hosea",
    JOEL: "Joel",
    AMO: "Amos",
    OBA: "Obadiah",
    JON: "Jonah",
    MIC: "Micah",
    NAH: "Nahum",
    HAB: "Habakkuk",
    ZEP: "Zephaniah",
    HAG: "Haggai",
    ZEC: "Zechariah",
    MAL: "Malachi",
    MAT: "Matthew",
    MRK: "Mark",
    LUK: "Luke",
    JHN: "John",
    ACT: "Acts",
    ROM: "Romans",
    "1CO": "1 Corinthians",
    "2CO": "2 Corinthians",
    GAL: "Galatians",
    EPH: "Ephesians",
    PHP: "Philippians",
    COL: "Colossians",
    "1TH": "1 Thessalonians",
    "2TH": "2 Thessalonians",
    "1TI": "1 Timothy",
    "2TI": "2 Timothy",
    TIT: "Titus",
    PHM: "Philemon",
    HEB: "Hebrews",
    JAM: "James",
    "1PE": "1 Peter",
    "2PE": "2 Peter",
    "1JN": "1 John",
    "2JN": "2 John",
    "3JN": "3 John",
    JUD: "Jude",
    REV: "Revelation",
  };

  const normalizeBook = (input) => {
    const userInput = input.trim().toLowerCase();

    // Exact match: abbreviation or full name
    for (const [abbr, name] of Object.entries(books)) {
      if (
        abbr.toLowerCase() === userInput ||
        name.toLowerCase() === userInput
      ) {
        return abbr;
      }
    }

    // Starts with (fuzzy match)
    for (const [abbr, name] of Object.entries(books)) {
      if (name.toLowerCase().startsWith(userInput)) {
        return abbr;
      }
    }

    return null; // No match found
  };

  const handleBibleSearch = async () => {
    setError(null);
    setResult(null);

    if (!book || !chapter) {
      setError("Please provide both the book and chapter.");
      setIsLoading(false);
      return;
    }

    const abbr = normalizeBook(book);
    if (!abbr) {
      setError("Book not recognized.");
      setIsLoading(false);
      return;
    }

    const verseId = verse
      ? `${abbr}.${chapter}.${verse}`
      : `${abbr}.${chapter}`;

    const endpoint = verse
      ? `${BASE_URL}/${bibleId}/verses/${verseId}`
      : `${BASE_URL}/${bibleId}/chapters/${verseId}`;

    const data = await fetchBibleData(endpoint, setError, setIsLoading);
    if (data && !data.error) {
      const cleanContent = data.data.content.replace(/<[^>]*>/g, "");
      setResult({ ...data.data, content: cleanContent });
    }
  };

  return (
    <div className="p-2 pt-2 gap-4">
      <form
        className="flex gap-2 pb-3 justify-end"
        onSubmit={(e) => {
          e.preventDefault();
          handleBibleSearch();
        }}
      >
        <BibleDisplayToggle
          isVerseByVerse={isVerseByVerse}
          toggleDisplayStyle={toggleDisplayStyle}
        />

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
          type="submit"
          className="bg-[#4a5759] text-white px-3 py-0.5 lg:py-1 rounded hover:bg-[#3b4647]"
        >
          Search
        </button>
      </form>

      {error && <p className="text-amber-500">{error}</p>}

      {result && (
        <BibleDisplay result={result} isVerseByVerse={isVerseByVerse} />
      )}
    </div>
  );
};
