import { SearchProvider } from "./SearchContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
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
    </QueryClientProvider>
  );
}

// IELr0PDK6v2tTjqx;...Foundation Supabase
