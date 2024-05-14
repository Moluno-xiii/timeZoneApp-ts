import { useState } from "react";
import { validTimeZones } from "../../misc/misc";
import Button from "../../components/Button";

const TimeZone: React.FC = () => {
  const [fromTimeZone, setFromTimeZone] = useState<string>("");
  const [toTimeZone, setToTimeZone] = useState<string>("");
  const handleToTimeZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToTimeZone(e.target.value);
  };
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
      <Button className = "md:ml-5">
        fetch data
      </Button>
    </div>
  );
};

export default TimeZone;
