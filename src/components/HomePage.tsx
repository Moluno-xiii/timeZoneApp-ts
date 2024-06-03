import { NavLink } from "react-router-dom";
import Footer from "./Footer";

const HomePage: React.FC = () => {

  return (
    <>
    <nav className="text-center ">
      <ul>
        <NavLink to="get-time">
          <li className="list-items">Get time</li>
        </NavLink>

        <NavLink to="convert-time">
          <li className="list-items">Time conversion</li>
        </NavLink>

        <NavLink to="calculate-time">
          <li className="list-items">
            Calculate Time by incrementing or decrementing
          </li>
        </NavLink>

      </ul>
    </nav>
    <div className="bottom-5 float-end">
      <Footer />
    </div>
    </>
  );
};

export default HomePage;
