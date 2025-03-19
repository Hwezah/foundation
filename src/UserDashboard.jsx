import Settings from "./settings";
import Notifications from "./notifications";
import User from "./user";
export default function UserDashboard() {
  return (
    <div className="flex justify-between gap-2">
      <Notifications />
      <User />
      <Settings />
    </div>
  );
}
