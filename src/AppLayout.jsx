import { Outlet } from "react-router-dom";
import Header from "./header";
import { BaseTools } from "./foundationUtilities";
import Hero from "./hero";

export default function AppLayout() {
  return (
    <>
      <div className="mx-auto bg-[#022b3a] max-w-[140rem] text-gray-100 min-h-screen">
        <Header />
        <Hero />
        <main>
          <Outlet />
        </main>
      </div>
      <BaseTools />
    </>
  );
}
