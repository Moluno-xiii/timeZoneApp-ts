import { useEffect, useState } from "react";
import { validTimeZones } from "../../misc/misc";
import Button from "../../components/Button";
import useFetchInfo from "../../hooks/useFetchInfo";
import Loader from "../../components/Loader";
import { convertTimeString } from "../../helper/helperFunctions";

const proxyURL = "http://localhost:3000/proxy?url=";
const timeZoneURL = "https://timeapi.io/api/Time/current/zone?timeZone=";

interface TimeZoneData {
  date: string;
  dateTime: string;
  dayOfWeek: string;
  dstActive: boolean;
  // Add other properties as needed
}

const TimeZone: React.FC = () => {
  const [result, setResult] = useState<string>("");
  // const [isLoading, setIsLoading] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { timeZone, isLoading } = useFetchInfo();
  const [fromTimeZone, setFromTimeZone] = useState<string>(timeZone || "");
  const [timezoneData, setTimezoneData] = useState<TimeZoneData | null>(null);

  useEffect(() => {
    if (timeZone) {
      setFromTimeZone(timeZone);
    }
  }, [timeZone]);
  const handleFromTimeZoneChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFromTimeZone(e.target.value as string);
  };

  const fetchTZ = async () => {
    try {
      const response = await fetch(`${proxyURL}${timeZoneURL}${fromTimeZone}`);
      const data = await response.json();
      console.log(data);
      setTimezoneData(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
      setErrorMessage("An error occurred while fetching timeZone data");
    }
  };

  const {
    date = "",
    dateTime = "",
    dayOfWeek = "",
    dstActive,
  } = timezoneData || {};

  return (
    <div className="text-center">
      <header className="text-2xl font-bold">
        Get IANA time using Timezone
      </header>
      {isLoading ? <Loader /> : <p>Your TimeZone : {timeZone}</p>}

      <select
        value={fromTimeZone}
        onChange={handleFromTimeZoneChange}
        className="focus:border-blue-500 focus:outline-none focus:ring-1"
      >
        <option value="">Select time zone</option>
        {validTimeZones.map((timeZone, index) => (
          <option key={index} value={timeZone}>
            {timeZone}
          </option>
        ))}
      </select>
      <Button onClick={fetchTZ} className="md:ml-5">
        fetch data
      </Button>
      <ul>
        {date && <li>Your Date :{date}</li>}
        {dateTime && <li>Your time :{convertTimeString(dateTime).newTime}</li>}
        {dayOfWeek && <li>Day of week :{dayOfWeek}</li>}
        {dstActive !== undefined && (
          <li>
            Daylight saving time : {dstActive === false ? "INACTIVE" : "ACTIVE"}{" "}
          </li>
        )}
        {dayOfWeek && <li>Day of week :{dayOfWeek}</li>}
      </ul>
    </div>
  );
};

export default TimeZone;
