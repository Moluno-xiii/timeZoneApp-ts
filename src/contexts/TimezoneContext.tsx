import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import useFetchInfo from "../hooks/useFetchInfo";

const proxyURL = "http://localhost:3000/proxy?url=";
const timeZoneURL = "https://timeapi.io/api/Time/current/zone?timeZone=";

interface TimeZoneData {
  date: string;
  dateTime: string;
  dayOfWeek: string;
  dstActive: boolean;
  timeZone: string
}

interface TimezoneContextValue {
  timezoneData: TimeZoneData | null;
  errorMessage: string;
  isLoading: boolean;
  fromTimezone: string;
  handleFromTimeZoneChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  fetchTZ: () => Promise<void>;
}

interface TimeZoneState {
  timezoneData: TimeZoneData | null;
  fromTimezone: string;
  errorMessage: string;
  isLoading: boolean;
}

type Action =
  | { type: "SET_FROM_TIMEZONE"; payload: string }
  | { type: "SET_ERROR_MESSAGE"; payload: string }
  | { type: "SET_RECEIVED_DATA"; payload: TimeZoneData }
  | { type: "SET_REQUEST_DATA";};

const defaultContextValue: TimezoneContextValue = {
  timezoneData: null,
  errorMessage: "",
  isLoading: false,
  fromTimezone: "",
  handleFromTimeZoneChange: () => {},
  fetchTZ: async () => {},
};

const initialState: TimeZoneState = {
  timezoneData: null,
  fromTimezone: "",
  errorMessage: "",
  isLoading: false,
};
const TimezoneContext =
  createContext<TimezoneContextValue>(defaultContextValue);

const timezoneReducer = (state: TimeZoneState, action: Action) => {
  switch (action.type) {
    case "SET_REQUEST_DATA":
      return { ...state, isLoading: true, errorMessage : ""};
    case "SET_FROM_TIMEZONE":
      return { ...state, fromTimezone: action.payload };
    case "SET_RECEIVED_DATA":
      return { ...state, isLoading: false, timezoneData: action.payload };
    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: action.payload, isLoading : false };
    default:
      return state;
  }
};

// eslint-disable-next-line react-refresh/only-export-components
const TimezoneProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [{ timezoneData, fromTimezone, errorMessage, isLoading }, dispatch] =
    useReducer(timezoneReducer, initialState);
  const { timeZone } = useFetchInfo();

  useEffect(() => {
    if (timeZone) {
      dispatch({ type: "SET_FROM_TIMEZONE", payload: timeZone });
    }
  }, [timeZone]);

  const handleFromTimeZoneChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch({ type: "SET_FROM_TIMEZONE", payload: e.target.value as string });
  };

  const fetchTZ = async () => {
    if (!fromTimezone) return;
    try {
      dispatch({ type: "SET_REQUEST_DATA" });
      const response = await fetch(`${proxyURL}${timeZoneURL}${fromTimezone}`);
      const data = await response.json();
      console.log(data);
      dispatch({ type: "SET_RECEIVED_DATA", payload: data });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: "An error occurred while fetching timeZone data",
      });
    }
  };

  const contextValue = {
    fetchTZ,
    handleFromTimeZoneChange,
    timezoneData,
    fromTimezone,
    errorMessage,
    isLoading,
  };

  return (
    <TimezoneContext.Provider value={contextValue}>
      {children}
    </TimezoneContext.Provider>
  );
};

export const useTimezoneContext =  () => {
    const context = useContext(TimezoneContext)
    if(context === undefined) throw new Error('context is undefined'

    )
return context

}

export default TimezoneProvider;
