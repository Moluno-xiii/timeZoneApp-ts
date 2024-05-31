import useFetchInfo from "../../hooks/useFetchInfo";
import Spinner from "../../components/Spinner";
import Button from "../../components/Button";
import { useState } from "react";

interface dataTypes {
  day: number;
}

const ConvertToDay: React.FC = () => {
  const { isLoading } = useFetchInfo();
  const [date, setDate] = useState("2021-12-05");
  const [data, setData] = useState<dataTypes | undefined>(undefined);

  async function convertTimeZone() {
    const proxyURL = "http://localhost:3000/proxy?url";
    const api_url = " https://timeapi.io/api/Conversion/DayOfTheYear";

    try {
      const response = await fetch(`${proxyURL}=${api_url}/${date}`);
      const data = await response.json();
      setData(data);
      console.log(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
    }
  }

  if (isLoading) return <Spinner />;
  return (
    <div>
      <header className="text-2xl font-bold mb-2">
        Get day of the year from a date
      </header>
      <input
        type="text"
        placeholder="YYYY-MM-DD"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="h-8 border border-slate-400 px-2 outline-none transition-all focus:border-red-500 focus:outline-none"
      />
      <p>
        {date} is the {data?.day} day of the year.
      </p>
      <Button onClick={convertTimeZone}>click me</Button>
    </div>
  );
};

export default ConvertToDay;
