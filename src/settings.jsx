import { NavLink } from "react-router-dom";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
export default function Settings() {
  return (
    <div>
      <NavLink to="/home">
        <HiAdjustmentsHorizontal className="w-6.5 h-6.5" />
      </NavLink>
    </div>
  );
}
