import SearchBar from "./searchBar";
import UserDashboard from "./UserDashboard";
import Donations from "./donations";
export default function Navigation() {
  return (
    <div className="flex-center flex items-center justify-between gap-4 px-12 py-1 w-full">
      <div className="flex items-center">
        <img
          src="public\Assets\FoundationLogoWhite.svg"
          alt="Foundation Stone Logo"
          className="w-[74px]"
        />

        <h1 className=" text-center text-4xl font-black ">Foundation.</h1>
      </div>
      <div className="flex-center flex items-center justify-around gap-4 w-[50%] py-4">
        <SearchBar />
        <Donations />
        <UserDashboard />
      </div>
    </div>
  );
}
