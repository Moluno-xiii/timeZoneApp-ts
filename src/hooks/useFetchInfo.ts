import { useEffect, useState } from "react";

const IpURL = "https://api.ipify.org?format=json";
const proxyURL = "http://localhost:3000/proxy?url=";
const timeZoneURL = "https://timeapi.io/api/Time/current/ip?ipAddress=";

const useFetchInfo = () => {
  const [ipAddress, setIpAddress] = useState<string >('');
  const [timeZone, setTimeZone] = useState<string >("");
  const [errorMessage, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchIpInfo() {
      try {
        setIsLoading(true);
        setError('');
        const response = await fetch(IpURL);
        const data = await response.json();
        setIpAddress(data.ip);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error.message);
        setError("An error occurred while fetching IP address");
      } finally {
        setIsLoading(false);
      }
    }
    fetchIpInfo();
  }, []);

  useEffect(() => {
    async function fetchTimeZone() {
      if (!ipAddress) return;
      setError('');
      setIsLoading(true);
      try {
        const response = await fetch(`${proxyURL}${timeZoneURL}${ipAddress}`);

        const data = await response.json();
        setTimeZone(data.timeZone);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error.message);
        setError("An error occurred while fetching timeZone data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchTimeZone();
  }, [ipAddress]);

  return { ipAddress, timeZone, errorMessage, isLoading };
};

export default useFetchInfo;
