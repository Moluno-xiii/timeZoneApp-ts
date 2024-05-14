import { NavLink } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// const timeZoneURL =
//   "https://cors-anywhere.herokuapp.com/https://timeapi.io/api/Time/current/ip?ipAddress=";

const HomePage: React.FC = () => {

     
  return (
    <>
    <nav className="text-center ">
      <Header />
      <ul>
        <NavLink to="getTime">
          <li className="list-items">Get time</li>
        </NavLink>

        <NavLink to="convertTime">
          <li className="list-items">Time conversion</li>
        </NavLink>

        <NavLink to="calculateTime">
          <li className="list-items">
            Calculate Time by incrementing or decrementing
          </li>
        </NavLink>

        <li>
          Don't know your timezone, check it
          <NavLink to="findTimeZone">
            <span className="text-purple-500"> here</span>
          </NavLink>
        </li>
      </ul>
    </nav>
    <div className="bottom-5 float-end">
      <Footer />
    </div>
    </>
  );
};

export default HomePage;
