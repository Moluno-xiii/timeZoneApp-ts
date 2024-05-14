import { useState } from "react";
import Button from "../../components/Button";

const IpAddress: React.FC = () => {
const [ipPlaceholder, setIpPlaceholder] = useState<string>('')

const ipPlaceholderOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setIpPlaceholder(e.target.value)
};

  return (
    <div className="text-center">
      <header className="mb-4 text-2xl font-bold">
        Get time with IpAddress
      </header>
      <input
        type="text"
        placeholder="00:00:00:00"
        className="focus:border-blue-500 px-3 border-2 focus:ring-1 focus:outline-none"
        value={ipPlaceholder}
        onChange={ipPlaceholderOnchange}
      />
      <Button className="md:ml-2">
        fetch data
      </Button>
    </div>
  );
};

export default IpAddress;
