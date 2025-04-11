import Hero from "./hero";
import Trending from "./trending";
import { SearchProvider } from "./SearchContext";
import Navigation from "./navigation";
import { BaseTools } from "./foundationUtilities";
export default function App() {
  return (
    <SearchProvider>
      <div className="mx-auto bg-[#022b3a] max-w-[140rem] text-gray-100 min-h-screen">
        <Navigation />
        <Hero />
        <Trending />
        <BaseTools />
      </div>
    </SearchProvider>
  );
}
