import { validTimeZones } from "../../misc/misc";
import Button from "../../components/Button";
import { convertTimeString } from "../../helper/helperFunctions";
import Spinner from "../../components/Spinner";
import { useConvertTimeZonesContext } from "../../contexts/ConvertTime/ConvertTimeZonesContext";
import ErrorMessage from "../../components/ErrorMessage";

const ConvertTimeZones: React.FC = () => {
  const {
    fromTimeZone,
    toTimeZone,
    date,
    isLoading,
    errorMessage,
    handleDateChange,
    handleTimeChange,
    time,
    timeZoneData: data,
    handleFromTimeZoneChange,
    handleToTimeZoneChange,
    fetchData,
  } = useConvertTimeZonesContext();
  if (isLoading) return <Spinner />;

  return (
    <div className="text-center">
      <header className="mb-2 text-2xl font-bold">
        Get IANA time using Timezone
      </header>
      <div className="flex flex-col items-center gap-y-3 xl:flex-row xl:justify-center">
        <select
          value={fromTimeZone}
          className="border border-slate-300 transition-all duration-300 focus:border focus:border-blue-500 focus:outline-none"
          onChange={handleFromTimeZoneChange}
        >
          <option value="">From</option>
          {validTimeZones.map((timeZone, index) => (
            <option key={index} value={timeZone} className="">
              {timeZone}
            </option>
          ))}
        </select>
        <select
          value={toTimeZone}
          onChange={handleToTimeZoneChange}
          className="duration-300focus:border border border-slate-300 transition-all focus:border-blue-500 focus:outline-none"
        >
          <option value="">To</option>
          {validTimeZones.map((timeZone, index) => (
            <option key={index} value={timeZone}>
              {timeZone}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="HH:MM:SS (24 hr format)"
          className="h-8 border px-2 transition-all duration-300 focus:border-blue-400 focus:outline-none"
          value={time}
          onChange={handleTimeChange}
        />
        <input
          type="text"
          placeholder="YYYY-MM-DD"
          className="h-8 border px-2 transition-all duration-300 focus:border-blue-400 focus:outline-none"
          value={date}
          onChange={handleDateChange}
        />
      </div>
    {data  &&  <p>
        converted date : {convertTimeString(data?.fromDateTime || "").date} and
        time : {convertTimeString(data?.fromDateTime || "").newTime} from{" "}
        <span className="text-red-400 hover:underline">
          {data?.fromTimezone}
        </span>{" "}
        to{" "}
        <span className="text-red-400 hover:underline">{data?.toTimeZone}</span>
      </p>}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {data && (
        <ul>
          <li>
            Date :{" "}
            {convertTimeString(data?.conversionResult.dateTime || "").date}
          </li>
          <li>
            Time :{" "}
            {convertTimeString(data?.conversionResult.dateTime || "").newTime}
          </li>
          <li>Timezone : {data?.conversionResult.timeZone}</li>
          <li>
            Daylight saving :{" "}
            {data?.conversionResult.dstActive ? "Active" : "Inactive"}
          </li>
        </ul>
      )}
      <Button className="md:ml-5" onClick={fetchData}>
        fetch data
      </Button>
    </div>
  );
};

export default ConvertTimeZones;
