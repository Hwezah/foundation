import Hero from "./hero";
import Trending from "./trending";
import { SearchProvider } from "./SearchContext";
import Navigation from "./navigation";

export default function App() {
  return (
    <SearchProvider>
      <div className="mx-auto bg-[#022b3a] text-gray-100 min-h-screen ">
        <Navigation />
        <Hero />
        <Trending />
      </div>
    </SearchProvider>
  );
}
