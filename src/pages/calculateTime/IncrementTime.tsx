import Button from "../../components/Button"
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import { useIncrementTimeContext } from "../../contexts/CalculateTime/IncrementTimeContext"
import { convertTimeString } from "../../helper/helperFunctions";
import { validTimeZones } from "../../misc/misc";


const IncrementTime: React.FC = () => {
    const {fetchData, time, date, handleDateChange, handleTimeChange, handleTimeSpanChange, handleTimeZoneChange, isLoading, errorMessage, timeZone, timeSpan, timeZoneData : data} = useIncrementTimeContext()

    if (isLoading) return <Spinner />
    return (
      <div className="text-center">
        <header className="mb-2 text-2xl font-bold">
          Get IANA time using Timezone
        </header>
        <div className="flex flex-col items-center gap-y-3 xl:flex-row xl:justify-center">
          <select
            value={timeZone}
            className="border border-slate-300 transition-all duration-300 focus:border focus:border-blue-500 focus:outline-none"
            onChange={handleTimeZoneChange}
          >
            <option value="">From</option>
            {validTimeZones.map((timeZone, index) => (
              <option key={index} value={timeZone} className="">
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
          <input
            type="text"
            placeholder="DD-HH-MM-SS"
            className="h-8 border px-2 transition-all duration-300 focus:border-blue-400 focus:outline-none"
            value={timeSpan}
            onChange={handleTimeSpanChange}
          />
        </div>
        {/* {data && (
          <p>
            converted date : {convertTimeString(data?.fromDateTime || "").date}{" "}
            and time : {convertTimeString(data?.fromDateTime || "").newTime}{" "}
            from{" "}
            <span className="text-red-400 hover:underline">
              {data?.fromTimezone}
            </span>{" "}
            to{" "}
            <span className="text-red-400 hover:underline">
              {data?.toTimeZone}
            </span>
          </p>
        )} */}
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {data && (
          <ul>
            <li>
              Date :{" "}
              {convertTimeString(data?.calculationResult?.dateTime || "").date}
            </li>
            <li>
              Time :{" "}
              {convertTimeString(data?.calculationResult?.dateTime || "").newTime}
            </li>
            <li>Timezone : {timeZone}</li>
            <li>
              Daylight saving :{" "}
              {data?.calculationResult?.dstActive ? "Active" : "Inactive"}
            </li>
          </ul>
        )}
        <Button className="md:ml-5" onClick={fetchData}>
          fetch data
        </Button>
      </div>
    );
}

export default IncrementTime
