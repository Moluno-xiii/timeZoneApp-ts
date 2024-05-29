import { NavLink } from "react-router-dom";
import { RiTimeZoneLine } from "react-icons/ri";

const Header: React.FC = () => {
  return (
    <nav className="mb-4 text-red-400">
      <NavLink to="/" className="text-2xl font-bold">
        <RiTimeZoneLine />
      </NavLink>
    </nav>
  );
};

export default Header;
