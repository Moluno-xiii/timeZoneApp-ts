import { useState } from "react";
import { validTimeZones } from "../../misc/misc";
import Button from "../../components/Button";
import axios from "axios";
import { convertTimeString } from "../../helper/helperFunctions";
import useFetchInfo from "../../hooks/useFetchInfo";
import Spinner from "../../components/Spinner";

interface dataTypes {
  conversionResult: {
    date: string;
    dateTime: string;
    dstActive: boolean;
    timeZone: string;
  };
  fromTimezone: string;
  toTimeZone: string;
  fromDateTime: string;
}

const proxyURL = "http://localhost:3000/proxy?url=";
const url = "https://timeapi.io/api/Conversion/ConvertTimeZone";

const ConvertTimeZones: React.FC = () => {
   const { isLoading } = useFetchInfo();
  const [fromTimeZone, setFromTimeZone] = useState<string>("Africa/Lagos");
  const [toTimeZone, setToTimeZone] = useState<string>("America/Los_Angeles");
  const [date, setDate] = useState("2024-05-31");
  const [time, setTime] = useState("09:40:00");
  const [data, setData] = useState<dataTypes | undefined>(undefined);

  const dateTime = `${date} ${time}`;
  const handleToTimeZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToTimeZone(e.target.value);
  };
  const handleFromTimeZoneChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFromTimeZone(e.target.value);
  };

  async function convertTimeZone() {
    const data = {
      fromTimeZone,
      dateTime,
      toTimeZone,
      dstAmbiguity: "",
    };

    try {
      const response = await axios.post(`${proxyURL}${url}`, data, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
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
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="YYYY:MM:DD"
          className="h-8 border px-2 transition-all duration-300 focus:border-blue-400 focus:outline-none"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <p>
        converted date : {convertTimeString(data?.fromDateTime || "").date} and
        time : {convertTimeString(data?.fromDateTime || "").newTime} from{" "}
        <span className="text-red-400 hover:underline">
          {data?.fromTimezone}
        </span>{" "}
        to{" "}
        <span className="text-red-400 hover:underline">{data?.toTimeZone}</span>
      </p>
      <ul>
        <li>
          Date : {convertTimeString(data?.conversionResult.dateTime || "").date}
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
      <Button className="md:ml-5" onClick={convertTimeZone}>
        fetch data
      </Button>
    </div>
  );
};

export default ConvertTimeZones;
