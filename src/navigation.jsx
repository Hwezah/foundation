import UserDashboard from "./UserDashboard";
import Donations from "./donations";
import { useSearch } from "./SearchContext";
import { fetchVideos } from "./Services/api";
import { useState } from "react";
export default function Navigation() {
  return (
    <div className=" flex items-center justify-between py-1 px-10 w-full">
      <div className="flex items-center">
        <img
          src="public\Assets\FoundationLogoWhite.svg"
          alt="Foundation Stone Logo"
          className="w-[74px]"
        />
        <h1 className=" xl:text-4xl md:text-3xl text-2xl font-black">
          Foundation.
        </h1>
      </div>
      <div className="flex items-center justify-around gap-4  py-4">
        <SearchBar />
        <Donations />
        <UserDashboard />
      </div>
    </div>
  );
}
function SearchBar() {
  const { description, setDescription, setIsLoading, setError, setTrends } =
    useSearch();
  const { strokeColor } = useSearch();
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    fetchVideos(description, setIsLoading, setError, setTrends);
    setShowSearch(false);
    setDescription("");
  };

  return (
    <div className="relative flex items-center md:block rounded-lg p-1">
      {/* Button for small screens */}
      <button
        onClick={() => setShowSearch(!showSearch)} // Toggle search bar visibility
        className="absolute top-1/2 right-6 -translate-y-1/2 rounded-full p-2 text-white transition md:hidden"
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
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={`flex lg:w-[350px] w-min flex-1 rounded-full bg-[#01222e] px-6 py-2 lg:py-3 transition-all duration-300 md:focus:w-[400px] font-bold text-gray-500 focus:outline-none ${
          showSearch ? "block" : "hidden"
        } md:block`} // Conditionally display
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(); // Perform search and hide search bar
          }
        }}
        placeholder="Search..."
      />
    </div>
  );
}
