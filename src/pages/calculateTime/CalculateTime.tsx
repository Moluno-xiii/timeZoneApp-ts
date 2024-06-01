import { NavLink, Outlet } from "react-router-dom";

const CalculateTime: React.FC = () => {
  return (
    <div className="text-center">
      <header className="text-2xl font-bold max-w-xl">
        Calculate future or past time using by incrementing or decrementing
      </header>

      <ul className="mx-2 flex flex-row justify-center gap-2 md:gap-5">
        <li className="list-items">
          <NavLink
            to="/calculate-time"
            end
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-500" : "text-black"
            }
          >
            Increment
          </NavLink>
        </li>
        <li className="list-items">
          <NavLink
            to="Decrement"
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-500" : "text-black"
            }
          >
            Decrement
          </NavLink>
        </li>
      </ul>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default CalculateTime;
