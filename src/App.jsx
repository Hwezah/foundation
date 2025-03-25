import Hero from "./hero";
import Trending from "./trending";
import { SearchProvider } from "./SearchContext";
import Navigation from "./navigation";
import Bible from "./Bible";
export default function App() {
  return (
    <SearchProvider>
      <div className="mx-auto bg-[#022b3a] text-gray-100">
        <Navigation />
        <Hero />
        <Trending />
        <Bible />
      </div>
    </SearchProvider>
  );
}
