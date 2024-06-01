import Spinner from "../../components/Spinner";
import Button from "../../components/Button";
import { useConvertToWeekContext } from "../../contexts/ConvertTime/ConvertToWeekContext";
import ErrorMessage from "../../components/ErrorMessage";

const ConvertToWeek: React.FC = () => {
  const { fetchData, weekData, date, isLoading, errorMessage, dateOnchange } =
    useConvertToWeekContext();

  if (isLoading) return <Spinner />;
  return (
    <div>
      <header className="mb-2 text-2xl font-bold">
        Get day of the week from a date
      </header>
      <input
        type="text"
        placeholder="YYYY-MM-DD"
        value={date}
        onChange={dateOnchange}
        className="h-8 border border-slate-400 px-2 outline-none transition-all focus:border-red-500 focus:outline-none"
      />
      {weekData !== null && (
        <p>
          Day of the week of {date} is {weekData?.dayOfWeek}
        </p>
      )}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Button onClick={fetchData}>click me</Button>
    </div>
  );
};

export default ConvertToWeek;
