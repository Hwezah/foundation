import { useState } from "react";
import { strokeColor, SearchContext } from "./constants";
import Settings from "./settings";
import Notifications from "./notifications";
import Hero from "./hero";
import Trending from "./trending";
import { useSearch } from "./constants";

function SearchProvider({ children }) {
  const [description, setDescription] = useState("");

  return (
    <SearchContext.Provider value={{ description, setDescription }}>
      {children}
    </SearchContext.Provider>
  );
}

export default function App() {
  return (
    <SearchProvider>
      <div className="mx-auto max-w-[120rem] bg-[#003049] text-gray-100">
        <Navigation />
        <Hero />
        <Trending />
      </div>
    </SearchProvider>
  );
}

function SearchBar() {
  const { description, setDescription } = useSearch();
  return (
    <div className="relative flex w-[40%] items-center  rounded-lg p-2">
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="flex w-[90%] min-w-[300px] flex-1 rounded-full  bg-[#012536] px-6 py-4 transition-all duration-300 focus:w-full font-bold text-gray-500 focus:outline-none"
        placeholder="Search..."
      />
      <button className="absolute top-1/2 right-6 -translate-y-1/2 rounded-full p-2 text-white transition">
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

function Navigation() {
  return (
    <div className="flex-center flex items-center justify-between gap-4 px-12 py-4 w-full">
      {/* <span>
        <img
          src="public\Assets\FoundationLogoWhite.svg"
          alt="Foundation Stone Logo"
          className="w-1/2"
        />
      </span> */}
      <h1 className=" text-center text-3xl font-bold m-0">Foundation.</h1>

      <a href="">Home</a>
      <a href="">Categories</a>
      <SearchBar />

      <div>
        <ul className="flex justify-between gap-6">
          <li>
            <a href="">Recommendations</a>
          </li>
        </ul>
      </div>
      <div className="flex">
        <Notifications />
        <Settings />
      </div>
    </div>
  );
}

// function Trending() {
//   const API_KEY = "AIzaSyCNyHlY3nfI0eJYR7_xHTobtrRTX3puk94";
//   const SEARCH_QUERY = "Gerald Mukuye"; // Change this to your preferred query
//   const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
//     SEARCH_QUERY
//   )}&maxResults=10&type=video&key=${API_KEY}`;

//   function YouTubeTrends() {
//     const [trends, setTrends] = useState([]);

//     useEffect(() => {
//       async function fetchVideos() {
//         try {
//           const response = await fetch(URL);
//           const data = await response.json();
//           console.log(data.items); // Contains the video details
//           setTrends(data.items); // ✅ Update state with fetched videos
//         } catch (error) {
//           console.error("Error fetching YouTube videos:", error);
//         }
//       }

//       fetchVideos();
//     }, [URL]); // ✅ Include URL in dependencies

//     return (
//       <div>
//         <h2>YouTube Trends</h2>
//         <ul>
//           {trends.map((video) => (
//             <li key={video.id.videoId}>
//               <h3>{video.snippet.title}</h3>
//               <img
//                 src={video.snippet.thumbnails.medium.url}
//                 alt={video.snippet.title}
//               />
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// function Searchbar() {
//   const [description, setDescription] = useState("");

//   return (
//     <div className="relative flex w-1/2 items-center gap-2 rounded-lg p-2">
//       <input
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         className="flex w-[90%] min-w-[300px] flex-1 rounded-full border border-gray-300 px-4 py-2 transition-all duration-300 focus:w-full focus:ring-2 focus:ring-gray-300 focus:outline-none"
//         placeholder="Search..."
//       />
//       <button className="absolute top-1/2 right-6 -translate-y-1/2 rounded-full p-2 text-white transition">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke={strokeColor}"#333"
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
//     </div>
//   );
// }
