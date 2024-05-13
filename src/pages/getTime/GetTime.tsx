import { NavLink } from "react-router-dom";
import useFetchInfo from "../../hooks/useFetchInfo";
import Loader from "../../components/Loader";

const GetTime: React.FC = () => {
  const { ipAddress, timeZone, isLoading } = useFetchInfo();
  return (
    <div className="text-center">
      <ul>
        <li className="list-items">
          <NavLink to="/timezone">Get time with timezone</NavLink>
        </li>
        <li className="list-items">
          <NavLink to="/IPaddress">Get time with IP Address</NavLink>
        </li>
        <li className="list-items">
          <NavLink to="/geoCoordinates">Get time with Geo Coordinates</NavLink>
        </li>
      </ul>
      <header>Get Time</header>

      {isLoading ? <Loader /> : <p>Your IP Address : {ipAddress}</p>}
      {isLoading ? <Loader /> : <p>Your TimeZone : {timeZone}</p>}
    </div>
  );
};

export default GetTime;
