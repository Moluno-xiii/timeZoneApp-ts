import { useEffect, useState } from "react";
import Button from "../../components/Button";
import useFetchInfo from "../../hooks/useFetchInfo";
import Loader from "../../components/Loader";
import { useIpContext } from "../../contexts/IpContext";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";

const proxyURL = "http://localhost:3000/proxy?url";
const API_URL = "https://timeapi.io/api/TimeZone/ip?ipAddress";

const IpAddress: React.FC = () => {
  const {
    FetchIpData,
    ipPlaceholderOnchange,
    formattedTime,
    ipPlaceholder,
    ipData,
    errorMessage,
    isLoading,
  } = useIpContext();

  const { ipAddress, isLoading: loadingIp } = useFetchInfo();

  if (isLoading) return <Spinner />;
  if (loadingIp) return <Spinner />;

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

      {errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <div>
          <p>Your Timezone : {ipData?.timeZone} </p>
          <p>Your current Time : {formattedTime} </p>
          {/* <p>Your current Date : {date} </p> */}
          <p>
            Daylight Savings :{" "}
            {ipData?.hasDayLightSaving === false ? "INACTIVE" : "ACTIVE"}{" "}
          </p>
          <p>
            Daylight Savings Active :{" "}
            {ipData?.isDayLightSavingActive === false ? "INACTIVE" : "ACTIVE"}{" "}
          </p>
        </div>
      )}
      <Button className="md:ml-2" onClick={FetchIpData}>
        fetch data
      </Button>
    </div>
  );
};

export default IpAddress;
