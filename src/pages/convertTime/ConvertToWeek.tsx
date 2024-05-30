import useFetchInfo from "../../hooks/useFetchInfo";
import Spinner from "../../components/Spinner";
import axios from "axios";
import Button from "../../components/Button";
import { useState } from "react";
import { convertTimeString } from "../../helper/helperFunctions";

interface dataTypes {
  conversionResult: {
    date: string;
    dateTime: string;
    dstActive: boolean;
    timeZone: string;
  };
  fromTimeZone : string;
  toTimeZone : string;
  fromDateTime : string;
}

const ConvertToWeek: React.FC = () => {
  const { isLoading } = useFetchInfo();
  const [fromTimeZone, setFromTimeZone] = useState("Africa/Lagos");
  const [toTimeZone, setToTimeZone] = useState("America/Los_Angeles");
  const [date, setDate] = useState("2024-05-31");
  const [time, setTime] = useState("09:40:00");
  const [data, setData] = useState<dataTypes | undefined>(undefined)

  const dateTime = `${date} ${time}`;
  async function convertTimeZone() {
    const proxyURL = "http://localhost:3000/proxy?url=";
    const url = "https://timeapi.io/api/Conversion/ConvertTimeZone";
    const data = {
      fromTimeZone,
      // dateTime: "2024-05-30 17:45:00",
      dateTime,
      toTimeZone,
      dstAmbiguity: "",
    };
    // const data = {
    //   fromTimeZone: "Europe/Amsterdam",
    //   dateTime: "2021-03-14 17:45:00",
    //   toTimeZone: "America/Los_Angeles",
    //   dstAmbiguity: "",
    // };

    try {
      const response = await axios.post(`${proxyURL}${url}`, data, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setData(response.data)
      //  console.log(dateTime);
    } catch (error) {
      // console.log(dateTime)
      console.error("Error:", error);
    }
  }

  if (isLoading) return <Spinner />;
  return (
    <div>
      <ul>
        <li>
          converted {dateTime} from {fromTimeZone} to {toTimeZone}
        </li>
        <li>
          Your date :{" "}
          {convertTimeString(data?.conversionResult.dateTime || "").date}
        </li>
        <li>
          Your time :{" "}
          {convertTimeString(data?.conversionResult.dateTime || "").newTime}
        </li>
        <li>
          Daylight saving active :{" "}
          {data?.conversionResult.dstActive ? "Active" : "Inactive"}
        </li>
        <li></li>
        <li></li>
      </ul>
      <Button onClick={convertTimeZone}>click me</Button>
    </div>
  );
};

export default ConvertToWeek;
