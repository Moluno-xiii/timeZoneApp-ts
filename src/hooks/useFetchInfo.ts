import { useEffect, useState } from "react";

const IpURL = "https://api.ipify.org?format=json";
const proxyURL = "http://localhost:3000/proxy?url";
const timeZoneURL = "https://timeapi.io/api/Time/current/ip?ipAddress";

const useFetchInfo = () => {
    const [ipAddress, setIpAddress] = useState<string | null>(null)
    const [timeZone, setTimeZone] = useState<string | null>(null)
    const [errorMessage, setError] = useState<string | null>(null);
  useEffect(function () {
    async function fetchIpInfo() {
      try {
        const response = await fetch(IpURL);
        const data = await response.json();
        console.log(data);
        setIpAddress(data.ip);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error.message);
        setError("An error occurred while fetching IP address");
      }
    }
    fetchIpInfo();
  }, []);

  useEffect(
    function () {
      async function fetchTimeZone() {
        try {
          const response = await fetch(
            `${proxyURL}=${timeZoneURL}=${ipAddress}`,
          );
          const data = await response.json();
          console.log(data);
          setTimeZone(data.timeZone);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error(error.message);
          setError("An error occurred while fetching timeZone data");
        }
      }
      fetchTimeZone();
    },
    [ipAddress],
  );


  return {ipAddress, timeZone, errorMessage};
};

export default useFetchInfo;
