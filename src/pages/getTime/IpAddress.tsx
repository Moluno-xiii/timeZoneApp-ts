import { useEffect, useState } from "react";
import Button from "../../components/Button";
import useFetchInfo from "../../hooks/useFetchInfo";

const proxyURL = "http://localhost:3000/proxy?url";
const API_URL = "https://timeapi.io/api/TimeZone/ip?ipAddress";


const IpAddress: React.FC = () => {
  const {ipAddress} = useFetchInfo()
  const stringIp = ipAddress? ipAddress.toString() : ""
  const [ipPlaceholder, setIpPlaceholder] = useState<string>(stringIp);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<Record<string, any> | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const ipPlaceholderOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIpPlaceholder(e.target.value);
  };

  useEffect(()=> {
    setIpPlaceholder(stringIp)
  }, [stringIp])

  async function FetchIpData() {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const response = await fetch(`${proxyURL}=${API_URL}=${ipPlaceholder}`);
      const data = await response.json();
      console.log(data);
      setResult(data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch {
      setErrorMessage("An error occurred, check your input and try again");
    } finally {
      setIsLoading(false);
    }
  }

  const currentLocalTime = result?.currentLocalTime;
  const [date, time] = currentLocalTime
    ? currentLocalTime.split("T")
    : ["", ""];
    const formattedTime = time.split(".")[0]
  
  return (
    <div className="text-center">
      <header className="mb-4 text-2xl font-bold">
        Your IpAddress is : {ipAddress}
      </header>
   
      <input
        type="text"
        placeholder="00.00.00.00"
        className="border-2 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1"
        value={ipPlaceholder}
        onChange={ipPlaceholderOnchange}
      />
      <Button className="md:ml-2" onClick={FetchIpData}>
        fetch data
      </Button>

      {!isLoading && !errorMessage && result && (
        <div>
          <p>Your TimeZone : {result.timeZone} </p>
          <p>Your current Time : {formattedTime} </p>
          <p>Your current Date : {date} </p>
          <p>
            Daylight Savings :{" "}
            {result.hasDayLightSaving === false ? "INACTIVE" : "ACTIVE"}{" "}
          </p>
          <p>
            Daylight Savings Active :{" "}
            {result.isDayLightSavingActive === false ? "INACTIVE" : "ACTIVE"}{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default IpAddress;
