import { SearchProvider } from "./SearchContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./AppLayout";
import Downloads from "./downloads";
import Subscriptions from "./subscriptions";
import Capture from "./capture";
import User from "./user";
import Cast from "./cast";
import Settings from "./settings";
import PageNotFound from "./PageNotFound";
import Trending from "./trending";
// import { useSearch } from "./SearchContext";
export default function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <Routes>
          <Route element={<AppLayout />}>
            {/* <Route index element={<Navigate replace to="/home" />} /> */}
            <Route index element={<Trending />} /> {/* Add this line */}
            <Route path="/user" element={<User />} />
            <Route path="/cast" element={<Cast />} />
            <Route path="/settings" element={<Settings />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/capture" element={<Capture />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  );
}
