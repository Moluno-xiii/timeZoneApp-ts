import { NavLink, Outlet } from "react-router-dom"; 
import useFetchInfo from "../../hooks/useFetchInfo";
import Loader from "../../components/Loader";

const TimeConversion: React.FC = () => {
  const { timeZone, isLoading } = useFetchInfo();
  return (
    <div className="text-center">
      <ul className="mx-2 flex flex-row gap-2 md:gap-5">
        <li className="list-items">
          <NavLink
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-500" : "text-black"
            }
            to="/convert-time" end
          >
            convert time to different zones
          </NavLink>
        </li>
        <li className="list-items">
          <NavLink
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-500" : "text-black"
            }
            to="convert-to-Week"
          >
            convert date to day of week
          </NavLink>
        </li>

        <li className="list-items">
          <NavLink
            to="convert-to-day"
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-500" : "text-black"
            }
          >
            convert date to day of the year
          </NavLink>
        </li>
      </ul>
      <header>Get Time</header>

      {isLoading ? <Loader /> : <p>Your TimeZone : {timeZone}</p>}

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default TimeConversion;
