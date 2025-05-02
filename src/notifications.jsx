import { NavLink } from "react-router-dom";
import { HiOutlineBellAlert } from "react-icons/hi2";
export default function Notifications() {
  return (
    <div>
      <NavLink to="/home">
        <HiOutlineBellAlert className="w-6 h-6" />
      </NavLink>
    </div>
  );
}
