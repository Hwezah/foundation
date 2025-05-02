import { NavLink } from "react-router-dom";
import { MdOutlineCast } from "react-icons/md";
export default function Cast() {
  return (
    <div>
      <NavLink to="/home">
        <MdOutlineCast className="w-5.5 h-5.5" />
      </NavLink>
    </div>
  );
}
