import { NavLink } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
export default function User() {
  return (
    <div>
      <NavLink to="/subscription">
        <HiOutlineUser className="w-6 h-6" />
      </NavLink>
    </div>
  );
}
