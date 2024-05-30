import { useState } from "react";
import { validTimeZones } from "../../misc/misc";
import Button from "../../components/Button";
import axios from "axios";

interface dataTypes {
  conversionResult: {
    date: string;
    dateTime: string;
    dstActive: boolean;
    timeZone: string;
  };
  fromTimeZone: string;
  toTimeZone: string;
  fromDateTime: string;
}

const proxyURL = "http://localhost:3000/proxy?url=";
const url = "https://timeapi.io/api/Conversion/ConvertTimeZone";

const ConvertTimeZones: React.FC = () => {
  const [fromTimeZone, setFromTimeZone] = useState<string>("");
  const [toTimeZone, setToTimeZone] = useState<string>("");
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
    const proxyURL = "http://localhost:3000/proxy?url=";
    const url = "https://timeapi.io/api/Conversion/ConvertTimeZone";
    const data = {
      date,
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

  return (
    <div className="text-center">
      <header className="text-2xl font-bold">
        Get IANA time using Timezone
      </header>

      <select
        value={fromTimeZone}
        onChange={handleFromTimeZoneChange}
        className="focus:border-blue-500 focus:outline-none focus:ring-1"
      >
        <option value="">From</option>
        {validTimeZones.map((timeZone, index) => (
          <option key={index} value={timeZone}>
            {timeZone}
          </option>
        ))}
      </select>
      <select
        value={toTimeZone}
        onChange={handleToTimeZoneChange}
        className="focus:border-blue-500 focus:outline-none focus:ring-1"
      >
        <option value="">To</option>
        {validTimeZones.map((timeZone, index) => (
          <option key={index} value={timeZone}>
            {timeZone}
          </option>
        ))}
      </select>
      <Button className="md:ml-5">fetch data</Button>
    </div>
  );
};

export default ConvertTimeZones;

// import useFetchInfo from "../../hooks/useFetchInfo";
// import Spinner from "../../components/Spinner";
// import axios from "axios";
// import Button from "../../components/Button";
// import { useState } from "react";
// import { convertTimeString } from "../../helper/helperFunctions";

// interface dataTypes {
//   conversionResult: {
//     date: string;
//     dateTime: string;
//     dstActive: boolean;
//     timeZone: string;
//   };
//   fromTimeZone: string;
//   toTimeZone: string;
//   fromDateTime: string;
// }

// const ConvertToWeek: React.FC = () => {
//   const { isLoading } = useFetchInfo();
//   const [fromTimeZone, setFromTimeZone] = useState("Africa/Lagos");
//   const [toTimeZone, setToTimeZone] = useState("America/Los_Angeles");
//   const [date, setDate] = useState("2024-05-31");
//   const [time, setTime] = useState("09:40:00");
//   const [data, setData] = useState<dataTypes | undefined>(undefined);

//   const dateTime = `${date} ${time}`;
//   async function convertTimeZone() {
//     const proxyURL = "http://localhost:3000/proxy?url=";
//     const url = "https://timeapi.io/api/Conversion/ConvertTimeZone";
//     const data = {
//       fromTimeZone,
//       dateTime,
//       toTimeZone,
//       dstAmbiguity: "",
//     };

//     try {
//       const response = await axios.post(`${proxyURL}${url}`, data, {
//         headers: {
//           accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       });
//       console.log(response.data);
//       setData(response.data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }
