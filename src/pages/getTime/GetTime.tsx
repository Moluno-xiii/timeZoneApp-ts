import { NavLink, Outlet } from "react-router-dom";

const GetTime: React.FC = () => {
  return (
    <div className="text-center">
      <ul className="flex flex-row gap-2 mx-2 md:gap-5 justify-center">
        <li className="list-items">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-black"
            }
            to="/get-time" end
          >
           with timezone
          </NavLink>
        </li>
        <li className="list-items">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-black"
            }
            to="IPaddress"
          >
           with IP Address
          </NavLink>
        </li>
        <li className="list-items">
          <NavLink
            to="geoCoordinates"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-black"
            }
          >
           with Geo Coordinates
          </NavLink>
        </li>
      </ul>


      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default GetTime;