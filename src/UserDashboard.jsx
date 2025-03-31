import Settings from "./settings";
import Notifications from "./notifications";
import User from "./user";
import Cast from "./cast";
// export default function UserDashboard() {
//   return (
//     <div className="flex justify-between gap-4 hidden">
//       <Notifications />
//       <User />
//       <Settings />
//     </div>
//   );
// }

export default function UserDashboard({ showSearch }) {
  return (
    <div
      // className={`flex justify-between gap-4 ${
      //   showSearch ? "hidden sm:block" : "block"
      // } `}

      className="flex justify-between gap-4"
    >
      <Cast />
      <Notifications />
      <User />
      <Settings />
    </div>
  );
}
