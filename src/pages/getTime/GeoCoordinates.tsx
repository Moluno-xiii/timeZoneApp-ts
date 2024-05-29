import Button from "../../components/Button";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { useGeolocation } from "../../hooks/useGeolocation";
import { convertTimeString } from "../../helper/helperFunctions";
import { useGeoContext } from "../../contexts/GeoContext";
import Spinner from "../../components/Spinner";


const GeoCoordinates: React.FC = () => {
  const { position, isLoading : loadingIp } = useGeolocation();
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
      <div className="">
        <p className="font-bold text-xl mb-4">
          your coordinates are latitude : {position?.lat} longitude :
          {position?.lng}
        </p>
        <input
          type="text"
          placeholder="Enter Latitude"
          value={latitude ? latitude : ""}
          className="border-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1"
          onChange={latitudeOnchange}
        />
        <input
          type="text"
          className="ml-2 border-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1"
          placeholder="Enter Longitude"
          value={longitude ? longitude : ""}
          onChange={longitudeOnchange}
        />
      </div>

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {geoData && !errorMessage && (
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
      {isLoading && <Loader />}
    </div>
  );
};

export default GeoCoordinates;
