import { validTimeZones } from "../../misc/misc";
import Button from "../../components/Button";
import useFetchInfo from "../../hooks/useFetchInfo";
import Loader from "../../components/Loader";
import { convertTimeString } from "../../helper/helperFunctions";
import { useTimezoneContext } from "../../contexts/TimezoneContext";
import Spinner from "../../components/Spinner";

const TimeZone: React.FC = () => {
  const {
    timezoneData,
    fetchTZ,
    fromTimezone,
    handleFromTimeZoneChange,
    isLoading,
  } = useTimezoneContext();
  const { timeZone : tzData, isLoading: loadingTz } = useFetchInfo();

  const {
    date = "",
    dateTime = "",
    dayOfWeek = "",
    dstActive,
    timeZone
  } = timezoneData || {};

  if (isLoading) return <Spinner />;
  if (loadingTz) return <Spinner />;
  return (
    <div className="text-center">
      <header className="text-2xl font-bold">
        Get IANA time using Timezone
      </header>
      {loadingTz ? <Loader /> : <p>Your Local Timezone : {tzData}</p>}

      <select
        value={fromTimezone}
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

      <ul className="mt-5">
        {timeZone && <li>Timezone name :{timeZone}</li>}
        {date && <li>Timezone Date :{date}</li>}
        {dateTime && <li>Timezone time :{convertTimeString(dateTime).newTime}</li>}
        {dayOfWeek && <li>Day of week :{dayOfWeek}</li>}
        {dstActive !== undefined && (
          <li>
            Daylight saving time : {dstActive === false ? "INACTIVE" : "ACTIVE"}{" "}
          </li>
        )}
        {dayOfWeek && <li>Day of week :{dayOfWeek}</li>}
      </ul>
      <Button onClick={fetchTZ} className="md:ml-5">
        fetch data
      </Button>
    </div>
  );
};

export default TimeZone;
