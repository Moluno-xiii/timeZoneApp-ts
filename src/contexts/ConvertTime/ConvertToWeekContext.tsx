import { createContext, ReactNode, useContext, useReducer } from "react";

    const proxyURL = "http://localhost:3000/proxy?url";
    const api_url = " https://timeapi.io/api/Conversion/DayOfTheWeek";


interface weekDataTypes {
  dayOfWeek: string;
}

interface ConvertToWeekContextValue {
  weekData: weekDataTypes | null;
  date: string;
  isLoading: boolean;
  errorMessage: string;
  fetchData: () => Promise<void>;
  dateOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface WeekState {
  weekData: weekDataTypes | null;
  date: string;
  isLoading: boolean;
  errorMessage: string;
}

const defaultContextValue: ConvertToWeekContextValue = {
  weekData: null,
  date: "",
  isLoading: false,
  errorMessage: "",
  fetchData: async () => {},
  dateOnchange: () => {},
};

type Action =
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_ERROR_MESSAGE"; payload: string }
  | { type: "SET_RECEIVED_DATA"; payload: weekDataTypes }
  | { type: "SET_REQUEST_DATA" };

const initialState: WeekState = {
  weekData: null,
  date: "",
  isLoading: false,
  errorMessage: "",
};
const ConvertToWeekContext =
  createContext<ConvertToWeekContextValue>(defaultContextValue);

const IpReducer = (state: WeekState, action: Action) => {
  switch (action.type) {
    case "SET_REQUEST_DATA":
      return { ...state, isLoading: true, errorMessage: "" };
    case "SET_DATE":
      return { ...state, weekData : null, date: action.payload };
    case "SET_RECEIVED_DATA":
      return { ...state, isLoading: false, weekData: action.payload };
    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: action.payload, isLoading: false };
    default:
      return state;
  }
};

// eslint-disable-next-line react-refresh/only-export-components
const ConvertToWeekContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [{ weekData, date, isLoading, errorMessage }, dispatch] = useReducer(
    IpReducer,
    initialState,
  );

  const dateOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_DATE", payload: e.target.value });
  };

  async function fetchData() {
    if (!date) return;
    try {
      dispatch({ type: "SET_REQUEST_DATA" });
      const response = await fetch(`${proxyURL}=${api_url}/${date}`);
      const data = await response.json();
      console.log(data);
      dispatch({ type: "SET_RECEIVED_DATA", payload: data });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: "An error occurred, check your input / network and try again",
      });
    }
  }

  const contextValue = {
    fetchData,
    weekData,
    date,
    isLoading,
    errorMessage,
    dateOnchange,
  };

  return (
    <ConvertToWeekContext.Provider value={contextValue}>
      {children}
    </ConvertToWeekContext.Provider>
  );
};

export const useConvertToWeekContext = () => {
  const context = useContext(ConvertToWeekContext);
  if (context === undefined) throw new Error("context is undefined");
  return context;
};

export default ConvertToWeekContextProvider;
