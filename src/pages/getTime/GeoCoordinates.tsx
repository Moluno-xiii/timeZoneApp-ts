import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import { useGeolocation } from "../../hooks/useGeolocation";
import { convertTimeString } from "../../helper/helperFunctions";
import { useGeoContext } from "../../contexts/GetTime/GeoContext";
import Spinner from "../../components/Spinner";

const GeoCoordinates: React.FC = () => {
  const { position, isLoading: loadingIp } = useGeolocation();
  const {
    fetchTimezoneInfo,
    formattedTime,
    latitudeOnchange,
    longitudeOnchange,
    errorMessage,
    isLoading,
    geoData,
    latitude,
    longitude,
  } = useGeoContext();

  if (isLoading) return <Spinner />;
  if (loadingIp) return <Spinner />;
  return (
    <div className="text-center">
      <header className="mb-4 text-2xl font-bold">
        Get time with Geo Coordinates
      </header>
      <div className="text-center">
        {position && (
          <p className="mb-4 text-xl font-bold">
            Your location's coordinates are <br /> latitude : {position?.lat},{" "}
            longitude :{position?.lng}
          </p>
        )}
        <input
          type="text"
          placeholder="Enter Latitude"
          value={latitude ? latitude : ""}
          className="h-8 border-2 px-3 transition-all duration-300 focus:border-blue-500 focus:outline-none"
          onChange={latitudeOnchange}
        />
        <input
          type="text"
          className="ml-2 h-8 border-2 px-3 transition-all duration-300 focus:border-blue-500 focus:outline-none"
          placeholder="Enter Longitude"
          value={longitude ? longitude : ""}
          onChange={longitudeOnchange}
        />
      </div>

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {geoData && (
        <ul>
          {geoData.timeZone && <li>Your Timezone : {geoData.timeZone}</li>}
          {geoData.hasDayLightSaving !== undefined && (
            <li>
              Daylight Saving : {geoData.hasDayLightSaving ? "YES" : "NO"}
            </li>
          )}
          {geoData.hasDayLightSaving && (
            <li>
              Daylight Saving :{" "}
              {geoData.isDayLightSavingActive ? "ACTIVE" : "INACTIVE"}
            </li>
          )}
          {geoData.currentLocalTime && (
            <>
              <li>
                Your Date : {convertTimeString(geoData.currentLocalTime).date}
              </li>
              <li>Your time : {formattedTime}</li>
            </>
          )}
        </ul>
      )}
      <Button onClick={fetchTimezoneInfo}>Fetch Data</Button>
    </div>
  );
};

export default GeoCoordinates;
