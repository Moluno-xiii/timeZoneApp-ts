import { useState } from "react";
import { validTimeZones } from "../../misc/misc";
import Button from "../../components/Button";

const TimeZone: React.FC = () => {
  const [fromTimeZone, setFromTimeZone] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleFromTimeZoneChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFromTimeZone(e.target.value);
  };

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
        <option value="">Select time zone</option>
        {validTimeZones.map((timeZone, index) => (
          <option key={index} value={timeZone}>
            {timeZone}
          </option>
        ))}
      </select>
      <Button className = "md:ml-5">
        fetch data
      </Button>
    </div>
  );
};

export default TimeZone;
