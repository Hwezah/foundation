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
      <div className="mx-auto max-w-[120rem] bg-[#022b3a] text-gray-100">
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
        className="flex w-[90%] min-w-[300px] flex-1 rounded-full  bg-[#01222e] px-6 py-4 transition-all duration-300 focus:w-full font-bold text-gray-500 focus:outline-none"
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
