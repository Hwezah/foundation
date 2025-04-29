// import { useSearch } from "../SearchContext";
import { useState } from "react";
import Fuse from "fuse.js";
import { fetchData } from "./Services/api";
import { useSearch } from "./SearchContext";
const BASE_URL = "https://api.scripture.api.bible/v1/bibles";
const API_KEY = "2917b29dcc612336646fc8dd29282dbd";

const fetchBibleData = async (endpoint) => {
  try {
    const response = await fetchData(endpoint, {
      method: "GET",
      headers: {
        "api-key": API_KEY,
      },
    });

    return response; // Return the data to the caller
  } catch (error) {
    throw new Error(error.message); // Throw error to be handled by the component
  }
};

function BibleDisplay({ result, isVerseByVerse, bibleVersion }) {
  return (
    <div className="bible-display">
      <div className="mt-1 px-2">
        <h3 className="text-lg font-bold text-blue-400">
          {result.reference}
          <span className="text-xs text-white font-semibold px-2">
            {bibleVersion}
          </span>
        </h3>
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

export default function Bible() {
  return (
    <div>
      <BibleSearch fetchBibleData={fetchBibleData} />
    </div>
  );
}

export const BibleSearch = ({ fetchBibleData }) => {
  const [verse, setVerse] = useState("");
  const [chapter, setChapter] = useState("");
  const [book, setBook] = useState("");
  const { isLoading, dispatch, error } = useSearch();
  const [result, setResult] = useState(null);
  const BIBLE_IDS = {
    KJV: "f276be3571f516cb-01",
    GANDA: "de4e12af7f28f599-01",
  };
  const [bibleVersion, setBibleVersion] = useState("KJV");
  const bibleId = BIBLE_IDS[bibleVersion];

  const [isVerseByVerse, setIsVerseByVerse] = useState(false);
  const toggleDisplayStyle = () => setIsVerseByVerse((prev) => !prev);

  const booksByVersion = {
    GANDA: {
      GEN: "Olubereberye",
      EXO: "Okuva",
      LEV: "Ebyabaleevi",
      NUM: "Okubala",
      DEU: "Ekyamateeka Olwokubiri",
      JOS: "Yoswa",
      JDG: "Balam",
      RUT: "Luusi",
      "1SA": "1 Samwiri",
      "2SA": "2 Samwiri",
      "1KI": "1 Bassekabaka",
      "2KI": "2 Bassekabaka",
      "1CH": "1 Ebyomumirembe",
      "2CH": "2 Ebyomumirembe",
      EZR: "Ezera",
      NEH: "Nekkemiya",
      EST: "Eseza",
      JOB: "Yobu",
      PSA: "Zabbuli",
      PRO: "Engero",
      ECC: "Omubuulizi",
      SNG: "Oluyimba",
      ISA: "Isaaya",
      JER: "Yeremiya",
      LAM: "Okukungubaga",
      EZK: "Ezeekyeri",
      DAN: "Danyeri",
      HOS: "Koseya",
      JOEL: "Yoweeri",
      AMO: "Amosi",
      OBA: "Obadiya",
      JON: "Yona",
      MIC: "Mikka",
      NAH: "Nakum",
      HAB: "Kaabakuuku",
      ZEP: "Zeffaniya",
      HAG: "Kaggayi",
      ZEC: "Zekkaliya",
      MAL: "Malaki",
      MAT: "Matayo",
      MRK: "Makko",
      LUK: "Lukka",
      JHN: "Yokaana",
      ACT: "Ebikolwa byʼAbatume",
      ROM: "Abaruumi",
      "1CO": "1 Abakkolinso",
      "2CO": "2 Abakkolinso",
      GAL: "Abaggalatiya",
      EPH: "Ephesians",
      PHP: "Abaefeso",
      COL: "Abakkolosaayi",
      "1TH": "1 Basessaloniika",
      "2TH": "2 Basessaloniika",
      "1TI": "1 Timoseewo",
      "2TI": "2 Timoseewo",
      TIT: "Tito",
      PHM: "Firemooni",
      HEB: "Abaebbulaniya",
      JAM: "Yakobo",
      "1PE": "1 Peetero",
      "2PE": "2 Peetero",
      "1JN": "1 Yokaana",
      "2JN": "2 Yokaana",
      "3JN": "3 Yokaana",
      JUD: "Yuda",
      REV: "Okubikkulirwa",
    },
    KJV: {
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
    },
    // Other versions
  };

  const normalizeBook = (input) => {
    const userInput = input.trim().toLowerCase();

    // 1. Exact match (abbreviation or name)
    for (const version of Object.keys(booksByVersion)) {
      const mapping = booksByVersion[version];
      for (const [abbr, name] of Object.entries(mapping)) {
        if (
          abbr.toLowerCase() === userInput ||
          name.toLowerCase() === userInput
        ) {
          return abbr; // Return standardized abbreviation
        }
      }
    }

    // 2. Starts with (simple fuzzy-ish)
    for (const version of Object.keys(booksByVersion)) {
      const mapping = booksByVersion[version];
      for (const [abbr, name] of Object.entries(mapping)) {
        if (name.toLowerCase().startsWith(userInput)) {
          return abbr;
        }
      }
    }

    // 3. Fuzzy match with Fuse.js
    const books = [];
    for (const version of Object.keys(booksByVersion)) {
      for (const [abbr, name] of Object.entries(booksByVersion[version])) {
        books.push({ abbr, name });
      }
    }

    const fuse = new Fuse(books, {
      keys: ["abbr", "name"],
      threshold: 0.4, // tweak if needed
    });

    const result = fuse.search(userInput);
    if (result.length > 0) {
      return result[0].item.abbr;
    }

    return null;
  };

  const handleBibleSearch = async () => {
    setResult(null);
    dispatch({ type: "LOADING" });
    dispatch({ type: "REJECTED", payload: "" });

    if (!book || !chapter) {
      dispatch({
        type: "REJECTED",
        payload: "Please provide both the book and chapter.",
      });
      dispatch({ type: "LOADING" });
      return;
    }

    const abbr = normalizeBook(book); // ✅ get abbreviation here
    // const abbr = getFuzzyBookAbbr(userInput);

    if (!abbr) {
      dispatch({
        type: "REJECTED",
        payload: "Book not recognised.",
      });
      dispatch({ type: "LOADED" });
      return;
    }

    const verseId = verse
      ? `${abbr}.${chapter}.${verse}`
      : `${abbr}.${chapter}`;

    const endpoint = verse
      ? `${BASE_URL}/${bibleId}/verses/${verseId}`
      : `${BASE_URL}/${bibleId}/chapters/${verseId}`;

    const data = await fetchBibleData(endpoint, error, isLoading, dispatch);

    if (data && !data.error) {
      const cleanContent = data.data.content.replace(/<[^>]*>/g, "");
      setResult({ ...data.data, content: cleanContent });
    }
  };

  return (
    <div className="p-2 w-full mx-auto">
      <form
        className="flex gap-1 justify-end mb-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleBibleSearch();
        }}
      >
        <button
          onClick={toggleDisplayStyle}
          className="bg-[#022b3a] text-white px-1.5 py-0.5 lg:py-1 rounded "
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
        <button
          onClick={() =>
            setBibleVersion((prev) => (prev === "KJV" ? "GANDA" : "KJV"))
          }
          className=" py-0.5 sm:inline-block bg-[#4a5759] text-white p-0.5 lg:py-1 rounded hover:bg-[#3b4647]"
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                opacity="0.4"
                d="M16.8203 2H7.18031C5.05031 2 3.32031 3.74 3.32031 5.86V19.95C3.32031 21.75 4.61031 22.51 6.19031 21.64L11.0703 18.93C11.5903 18.64 12.4303 18.64 12.9403 18.93L17.8203 21.64C19.4003 22.52 20.6903 21.76 20.6903 19.95V5.86C20.6803 3.74 18.9503 2 16.8203 2Z"
                fill="#fff"
              ></path>{" "}
              <path
                d="M12.0007 10.2801C10.9807 10.2801 9.96074 10.1001 8.99074 9.75005C8.60074 9.61005 8.40074 9.18005 8.54074 8.79005C8.69074 8.40005 9.12074 8.20005 9.51074 8.34005C11.1207 8.92005 12.8907 8.92005 14.5007 8.34005C14.8907 8.20005 15.3207 8.40005 15.4607 8.79005C15.6007 9.18005 15.4007 9.61005 15.0107 9.75005C14.0407 10.1001 13.0207 10.2801 12.0007 10.2801Z"
                fill="#292D32"
              ></path>{" "}
            </g>
          </svg>
        </button>

        <input
          className="bg-[#022b3a] border-none focus:outline-none min-w-[100px] border rounded px-2"
          type="text"
          placeholder="Book"
          value={book}
          onChange={(e) => setBook(e.target.value)}
        />
        <input
          className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [moz-appearance:textfield] bg-[#022b3a] border-none focus:outline-none w-[8ch] border border-gray-300 rounded px-2 appearance-none"
          type="number"
          placeholder="Chapter"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
        />
        <input
          className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [moz-appearance:textfield] bg-[#022b3a] border-none focus:outline-none w-[6ch] border border-gray-300 rounded px-2 appearance-none"
          type="number"
          placeholder="Verse"
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
        />

        <button
          type="submit"
          className="hidden sm:inline-block bg-[#4a5759] text-white px-2 py-0.5 lg:py-1 rounded hover:bg-[#3b4647]"
        >
          Search
        </button>
        <button type="submit" className="sm:hidden py-1">
          <BibleSearchButton />
        </button>
      </form>
      {error && <p className="text-amber-500">{error}</p>}
      {result && (
        <BibleDisplay result={result} isVerseByVerse={isVerseByVerse} />
      )}
    </div>
  );
};

function BibleSearchButton() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010 17.5 7.5 7.5 0 0016.65 16.65z"
        />
      </svg>
    </div>
  );
}
