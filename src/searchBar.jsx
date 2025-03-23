import { useSearch } from "./SearchContext";
export default function SearchBar() {
  const { description, setDescription } = useSearch();
  const { strokeColor } = useSearch();
  return (
    <div className="relative flex items-center md:block hidden rounded-lg p-1 ">
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="flex w-[400px] flex-1 rounded-full  bg-[#01222e] px-6 py-3 transition-all duration-300 focus:w-full font-bold text-gray-500 focus:outline-none"
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
