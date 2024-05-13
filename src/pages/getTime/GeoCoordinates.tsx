import { useState } from "react";

const GeoCoordinates: React.FC = () => {
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);

  const latitudeOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setLatitude(e.target.value);
    const value = parseFloat(e.target.value);
    setLatitude(isNaN(value) ? 0 : value);
  };
  const longitudeOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setLongitude(e.target.value);
    const value = parseFloat(e.target.value);
    setLongitude(isNaN(value) ? 0 : value);
  };
  return (
    <div className="text-center">
      <header className="mb-4 text-2xl font-bold">
        Get time with Geo Coordinates
      </header>
      <div>

      <input
        type="text"
        className="border-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1"
        value={latitude}
        onChange={latitudeOnchange}
        />
      <input
        type="text"
        className="ml-2 border-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1"
        value={longitude}
        onChange={longitudeOnchange}
        />
        </div>
      <button className="px-10 rounded-md bg-blue-400 mt-4 py-2 font-semibold">Fetch Data</button>
    </div>
  );
};

export default GeoCoordinates;
