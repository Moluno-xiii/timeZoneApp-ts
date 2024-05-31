import Button from "../../components/Button";
import useFetchInfo from "../../hooks/useFetchInfo";
import { useIpContext } from "../../contexts/GetTime/IpContext";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";

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
  // if (!ipData) return;

  return (
    <div className="text-center">
      <header className="mb-4 text-2xl font-bold">
        Get Time info using any IpAddress <br/>
        Your Location's IpAddress is : {ipAddress}
      </header>
      <input
        type="text"
        placeholder="00.00.00.00"
        className="border-2 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 transition-all duration-300"
        value={ipPlaceholder}
        onChange={ipPlaceholderOnchange}
      />
      {ipData && (
        <div className="">
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

      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Button className="md:ml-2" onClick={FetchIpData}>
        fetch data
      </Button>
    </div>
  );
};

export default IpAddress;
