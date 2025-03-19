import Hero from "./hero";
import Trending from "./trending";
import { SearchProvider } from "./searchBar";
import ContentBar from "./contentBar";
import Navigation from "./navigation";

export default function App() {
  return (
    <SearchProvider>
      <div className="mx-auto max-w-[120rem] bg-[#022b3a] text-gray-100">
        <Navigation />
        <Hero />
        <Trending />
        <ContentBar />
      </div>
    </SearchProvider>
  );
}
