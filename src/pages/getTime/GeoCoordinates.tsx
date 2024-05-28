import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { useGeolocation } from "../../hooks/useGeolocation";
import { convertTimeString } from "../../helper/helperFunctions";

interface TimeZoneData {
  hasDayLightSaving: boolean;
  isDayLightSavingActive: boolean;
  timeZone: string;
  currentLocalTime: string;
  // Add other properties as needed
}
const proxyURL = "http://localhost:3000/proxy?url";
const API_URL = "https://timeapi.io/api/TimeZone/coordinate?";
const GeoCoordinates: React.FC = () => {
  const { position } = useGeolocation();
  const [longitude, setLongitude] = useState<number | undefined>(position?.lng);
  const [latitude, setLatitude] = useState<number | undefined>(position?.lat);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<TimeZoneData | "">("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const latitudeOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLatitude(isNaN(value) ? 0 : value);
  };
  const longitudeOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLongitude(isNaN(value) ? 0 : value);
  };

  useEffect(() => {
    setLatitude(position?.lat);
    setLongitude(position?.lng);
    console.log(position);
  }, [position]);

  async function fetchTimezoneInfo() {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const response = await fetch(
        `${proxyURL}=${API_URL}latitude=${latitude}&longitude=${longitude}`,
      );
      const data = await response.json();
      console.log(data);
      console.log(position);
      setResult(data);
    } catch {
      setErrorMessage("failed to fetch, check your input");
    } finally {
      setIsLoading(false);
    }
  }

  const {
    hasDayLightSaving,
    isDayLightSavingActive,
    currentLocalTime,
    timeZone,
  } = result as TimeZoneData

  return (
    <div className="text-center">
      <header className="mb-4 text-2xl font-bold">
        Get time with Geo Coordinates
      </header>
      <div>
        <p>
          your coordinates are latitude : {latitude} longitude :{longitude}
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
      <Button onClick={fetchTimezoneInfo}>Fetch Data</Button>
      {!isLoading && !errorMessage && result && (
        <ul>
          {timeZone && <li>Your Timezone : {timeZone}</li>}
          {hasDayLightSaving && (
            <li>Daylight Saving : {hasDayLightSaving ? "YES" : "NO"}</li>
          )}
          {hasDayLightSaving && (
            <li>result : {isDayLightSavingActive ? "ACTIVE" : "INACTIVE"}</li>
          )}
          {currentLocalTime && (
            <>
              <li>Your Date : {convertTimeString(currentLocalTime).date}</li>
              <li>Your time : {convertTimeString(currentLocalTime).newTime}</li>
            </>
          )}
        </ul>
      )}
      {isLoading && <Loader />}
      {errorMessage.length > 1 && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default GeoCoordinates;

