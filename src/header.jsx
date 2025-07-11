import UserDashboard from "./UserDashboard";
import Donations from "./donations";
import { useSearch } from "./SearchContext";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiMiniMagnifyingGlass, HiMiniArrowRight } from "react-icons/hi2";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between lg:p-4 p-2.5  w-full xl:px-10 md:px-4 sm:px-2 lg:px-6">
        <div className="flex items-center">
          <img
            src="public\\Assets\\FoundationLogoWhite.svg"
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
        <div className="flex items-center justify-between lg:gap-4 gap-1.5 ">
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
  const { query, dispatch } = useSearch();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [searchQuery, setsearchQuery] = useState(query);

  function handleSearch() {
    if (!searchQuery || searchQuery.trim() === "") {
      dispatch({
        type: "REJECTED",
        payload: "Please enter a valid search term.",
      });
      return;
    }

    dispatch({ type: "SET_QUERY", payload: searchQuery });
    setShowSearch(false);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex items-center relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="relative flex items-center md:block rounded-lg"
      >
        <button
          type="button"
          onClick={() => {
            if (isSmallScreen) {
              if (!showSearch) {
                setShowSearch(true);
              } else {
                handleSearch();
              }
            } else {
              handleSearch();
            }
          }}
          className={`absolute top-1/2 -translate-y-1/2 rounded-full text-white transition ${
            showSearch ? "right-2" : "right-1"
          } md:right-6`}
        >
          <NavLink>
            <HiMiniMagnifyingGlass className="w-6 h-6" />
          </NavLink>
        </button>

        {/* Wrapper for arrow + input */}
        <div className="flex items-center">
          {/* Collapse arrow on left */}
          {showSearch && isSmallScreen && (
            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="text-white mr-2"
            >
              <HiMiniArrowRight className="w-6 h-6" />
            </button>
          )}

          <input
            value={searchQuery}
            onChange={(e) => setsearchQuery(e.target.value)}
            className={`flex xl:w-[350px] w-[14rem] rounded-full bg-[#01222e] px-6 py-1.5 sm:py-2.5 xl:py-3 transition-all duration-300 md:focus:w-[400px] font-bold text-gray-500 focus:outline-none ${
              showSearch ? "block" : "hidden"
            } md:block`}
            placeholder="Search Foundation..."
          />
        </div>
      </form>
    </div>
  );
}
