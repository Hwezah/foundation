import UserDashboard from "./UserDashboard";
import Donations from "./donations";
import { useSearch } from "./SearchContext";
import { fetchVideos } from "./Services/api";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between lg:p-4 p-2.5  w-full">
        <div className="flex items-center">
          <img
            src="public\Assets\FoundationLogoWhite.svg"
            alt="Foundation Logo"
            className="w-[74px] hidden lg:block"
          />
          <h1
            className={`xl:text-4xl md:text-3xl text-2xl font-black ${
              showSearch ? "hidden sm:block" : "block"
            }`}
          >
            Foundation.
          </h1>
        </div>
        <div className="flex items-center justify-between gap-4  ">
          <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} />
          <Donations showSearch={showSearch} />
          <UserDashboard
            showSearch={showSearch}
            setShowSearch={setShowSearch}
          />
        </div>
      </div>
    </>
  );
}
function SearchBar({ showSearch, setShowSearch }) {
  const { description, setDescription, setIsLoading, setError, setTrends } =
    useSearch();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [inputValue, setInputValue] = useState(description);

  const handleSearch = () => {
    setIsLoading(true);
    setDescription(inputValue);
    fetchVideos(inputValue, setIsLoading, setError, setTrends);
    setShowSearch(false);
    setInputValue("");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Set breakpoint at 768px for small screens
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative flex items-center md:block rounded-lg">
      {/* Button for small screens */}
      <button
        onClick={() => isSmallScreen && setShowSearch(!showSearch)} // Only toggle on small screens
        className={`absolute top-1/2 -translate-y-1/2 rounded-full  text-white transition ${
          showSearch ? "right-6" : "right-1"
        } md:right-6`} // Apply right-6 on medium screens and larger
      >
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
      </button>

      {/* Full search bar on medium screens and above */}
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={`flex lg:w-[350px] w-min flex-1 rounded-full bg-[#01222e] px-6 py-1.5 sm:py-2.5 xl:py-3 transition-all duration-300 md:focus:w-[400px] font-bold text-gray-500 focus:outline-none ${
          showSearch ? "block" : "hidden"
        } md:block`} // Conditionally display
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(); // Perform search and hide search bar
          }
        }}
        placeholder="Search Foundation..."
      />
    </div>
  );
}
