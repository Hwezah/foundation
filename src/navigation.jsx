import SearchBar from "./searchBar";
import UserDashboard from "./UserDashboard";
import Donations from "./donations";
export default function Navigation() {
  return (
    <div className=" flex items-center justify-between gap-4 px-10 py-1 w-full">
      <div className="flex items-center">
        <img
          src="public\Assets\FoundationLogoWhite.svg"
          alt="Foundation Stone Logo"
          className="w-[74px]"
        />
        <h1 className=" xl:text-4xl sm:text-3xl font-black ">Foundation.</h1>
      </div>
      <div className="flex items-center justify-around gap-4  py-4">
        <SearchBar />
        <Donations />
        <UserDashboard />
      </div>
    </div>
  );
}
