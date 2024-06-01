import Spinner from "../../components/Spinner";
import Button from "../../components/Button";
import { useConvertToDayContext } from "../../contexts/ConvertTime/ConvertToDayContext";
import ErrorMessage from "../../components/ErrorMessage";

const ConvertToDay: React.FC = () => {
  const { fetchData, dayData, date, isLoading, errorMessage, dateOnchange } =
    useConvertToDayContext();

  if (isLoading) return <Spinner />;
  return (
    <div>
      <header className="mb-2 text-2xl font-bold">
        Get day of the year from a date
      </header>
      <input
        type="text"
        placeholder="YYYY-MM-DD"
        value={date}
        onChange={dateOnchange}
        className="h-8 border border-slate-400 px-2 outline-none transition-all focus:border-red-500 focus:outline-none"
      />
      {dayData && !errorMessage && !isLoading && (
        <p>
          {date} is day {dayData?.day} of the year.
        </p>
      )}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Button onClick={fetchData}>click me</Button>
    </div>
  );
};

export default ConvertToDay;
