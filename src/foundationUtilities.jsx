import { useSearch } from "./SearchContext";
import Bible from "./Services/Bible";
export default function FoundationUtilities() {
  const { selectedVideo, isFeedVisible, setIsFeedVisible, description } =
    useSearch();

  return (
    <div
      className={`xl:max-w-[30%] w-full bg-[#01212c] gap-6 xl:pt-0 xl:p-6 xl:h-full h-fit ${
        isFeedVisible ? "overflow-y-auto scrollbar-hidden" : ""
      }`}
    >
      {" "}
      <div className=" xl:w-full ">
        <div className="sticky top-0 bg-[#01212c] xl:pt-6">
          <h2 className="hidden xl:block text-2xl md:text-3xl font-black mb-3 pt-6  px-4   xl:p-0">
            <span className="text-[#4a5759] uppercase">Following,</span>{" "}
            <span>{description}'s Foundation.</span>
          </h2>
          <div className="flex justify-between bg-[#4a5759] px-4 py-3 xl:px-6 xl:py-4 items-center">
            <h3 className="w-3/4 xl:w-full truncate xl:truncate-two-lines">
              <span className="text-2xl text-white font-extrabold mr-3">
                On:
              </span>
              <span className="  font-bold lg:text-lg  text-[#01212c] ">
                {selectedVideo.snippet.title}...
              </span>
            </h3>
            <div className="xl:hidden">
              <Tools setIsFeedVisible={setIsFeedVisible} />
            </div>
          </div>
        </div>
        {isFeedVisible && <Bible />}
      </div>
    </div>
  );
}

export function Tools({ setIsFeedVisible }) {
  return (
    <div className="xl:bg-[#01212c] xl:p-4 h-full flex gap-2 xl:flex-col xl:justify-between">
      <svg
        onClick={() => {
          setIsFeedVisible((prev) => !prev);
        }}
        height={"44px"}
        width={"44px"}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            opacity="0.5"
            d="M2 9C2 5.22876 2 3.34315 3.17157 2.17157C4.34315 1 6.22876 1 10 1H14C17.7712 1 19.6569 1 20.8284 2.17157C22 3.34315 22 5.22876 22 9V13C22 16.7712 22 18.6569 20.8284 19.8284C19.6569 21 17.7712 21 14 21H10C6.22876 21 4.34315 21 3.17157 19.8284C2 18.6569 2 16.7712 2 13V9Z"
            fill="#fff"
          ></path>{" "}
          <path
            d="M6 12.9108V7.49649C6 6.67251 6.66539 6.00074 7.48717 6.06091C7.99967 6.09844 8.55592 6.16228 9 6.27079C9.8239 6.4721 10.851 6.9711 11.4646 7.29318C11.4763 7.29933 11.4881 7.30525 11.5 7.31094V15.7262C11.4975 15.7249 11.495 15.7236 11.4926 15.7223C10.8826 15.4009 9.83655 14.8896 9 14.6852C8.56248 14.5783 8.01608 14.5147 7.50991 14.477C6.67934 14.4151 6 13.7437 6 12.9108Z"
            fill="#01212c"
          ></path>{" "}
          <path
            d="M12.5 15.7262C12.5025 15.7249 12.505 15.7236 12.5074 15.7223C13.1174 15.4009 14.1634 14.8896 15 14.6852C15.4375 14.5783 15.9839 14.5147 16.4901 14.477C17.3207 14.4151 18 13.7437 18 12.9108V7.45154C18 6.64543 17.3619 5.98216 16.5568 6.0217C15.9405 6.05197 15.2404 6.12099 14.7 6.27079C13.9685 6.47356 13.0752 6.95027 12.5219 7.27042C12.5147 7.27462 12.5073 7.27874 12.5 7.28277V15.7262Z"
            fill="#01212c"
          ></path>{" "}
        </g>
      </svg>
      <svg
        onClick={() => setIsFeedVisible((prev) => !prev)}
        height={"44px"}
        width={"44px"}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="[#01212c]"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            opacity="0.5"
            d="M11.9993 2C16.7133 2 19.0704 2 20.5348 3.46447C21.2923 4.22195 21.658 5.21824 21.8345 6.65598V10H2.16406V6.65598C2.3406 5.21824 2.70628 4.22195 3.46377 3.46447C4.92823 2 7.28525 2 11.9993 2Z"
            fill="#fff"
          ></path>{" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 14C2 11.1997 2 9.79961 2.54497 8.73005C3.02433 7.78924 3.78924 7.02433 4.73005 6.54497C5.79961 6 7.19974 6 10 6H14C16.8003 6 18.2004 6 19.27 6.54497C20.2108 7.02433 20.9757 7.78924 21.455 8.73005C22 9.79961 22 11.1997 22 14C22 16.8003 22 18.2004 21.455 19.27C20.9757 20.2108 20.2108 20.9757 19.27 21.455C18.2004 22 16.8003 22 14 22H10C7.19974 22 5.79961 22 4.73005 21.455C3.78924 20.9757 3.02433 20.2108 2.54497 19.27C2 18.2004 2 16.8003 2 14ZM12.75 11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V15.1893L10.0303 13.9697C9.73744 13.6768 9.26256 13.6768 8.96967 13.9697C8.67678 14.2626 8.67678 14.7374 8.96967 15.0303L11.4697 17.5303C11.6103 17.671 11.8011 17.75 12 17.75C12.1989 17.75 12.3897 17.671 12.5303 17.5303L15.0303 15.0303C15.3232 14.7374 15.3232 14.2626 15.0303 13.9697C14.7374 13.6768 14.2626 13.6768 13.9697 13.9697L12.75 15.1893V11Z"
            fill="#01212c"
          ></path>{" "}
        </g>
      </svg>
    </div>
  );
}

// import { useSearch } from "../SearchContext";
// import { useState } from "react";
// import { Loader } from "../trending";
// import { strokeColor } from "../constants";

// // bibleApi.js
// const BASE_URL = "https://example-bible-api.com"; // Replace with actual API URL

// const fetchBibleVerse = async (
//   version,
//   book,
//   chapter,
//   verse,
//   setError,
//   setIsLoading
// ) => {
//   try {
//     setIsLoading(true);
//     setError("");
//     if (!version || !book || !chapter || !verse) {
//       throw new Error(
//         "All parameters (version, book, chapter, verse) are required"
//       );
//     }

//     const response = await fetch(
//       `${BASE_URL}/${version}/${book}/${chapter}/${verse}`
//     );

//     if (!response.ok) {
//       throw new Error(`Error ${response.status}: Unable to fetch verse`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Bible API Error:", error.message);
//     return { error: error.message };
//   } finally {
//     setIsLoading(false);
//   }
// };

// // Bible Component
// export default function Bible() {
//   return (
//     <div>
//       <BibleSearch fetchBibleVerse={fetchBibleVerse} />
//     </div>
//   );
// }

// // BibleSearch Component
// export const BibleSearch = ({ fetchBibleVerse }) => {
//   const [version, setVersion] = useState("");
//   const [book, setBook] = useState("");
//   const [chapter, setChapter] = useState("");
//   const [verse, setVerse] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const { setIsLoading } = useSearch();

//   const handleBibleSearch = async () => {
//     setIsLoading(true);
//     setError(null);
//     setResult(null);

//     if (!book || !chapter || !verse) {
//       setError("Please fill in all fields");
//       return;
//     }

//     const data = await fetchBibleVerse(version, book, chapter, verse);
//     if (data.error) {
//       setError(data.error);
//     } else {
//       setResult(data);
//     }
//   };

//   return (
//     <div className="flex justify-center p-4 gap-4">
//       <input
//         className="focus:outline-none w-fit min-w-[100px]"
//         type="text"
//         placeholder="Version (e.g., KJV)"
//         value={version}
//         onChange={(e) => setVersion(e.target.value)}
//       />
//       <input
//         className="focus:outline-none w-fit min-w-[100px]"
//         type="text"
//         placeholder="Book"
//         value={book}
//         onChange={(e) => setBook(e.target.value)}
//       />
//       <input
//         className="focus:outline-none w-[8ch] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
//         type="number"
//         placeholder="Chapter"
//         value={chapter}
//         onChange={(e) => setChapter(e.target.value)}
//       />
//       <input
//         className="focus:outline-none w-[6ch] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
//         type="number"
//         placeholder="Verse"
//         value={verse}
//         onChange={(e) => setVerse(e.target.value)}
//         onKeyPress={(e) => e.key === "Enter" && handleBibleSearch()}
//       />
//       <button onClick={handleBibleSearch}>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke={strokeColor}
//           className="h-5 w-5"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010 17.5 7.5 7.5 0 0016.65 16.65z"
//           />
//         </svg>
//       </button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {result && <p>{result.text}</p>}
//     </div>
//   );
// };
