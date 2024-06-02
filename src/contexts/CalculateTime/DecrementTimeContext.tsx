import { createContext, ReactNode, useContext, useEffect, useReducer } from "react"

import useFetchInfo from "../../hooks/useFetchInfo";
import axios from "axios";

const proxyURL = "http://localhost:3000/proxy?url=";
const api_url = " https://timeapi.io/api/Calculation/custom/decrement";

interface timeZoneTypes {
  calculationResult: {
    date: string;
    dateTime: string;
    dstActive: boolean;
    timeZone: string;
  };
  originalDateTime: string;
  timeZone: string;
  usedTimeSpan: string;
}

interface ConvertTimeZonesValue {
  timeZoneData: timeZoneTypes | null;
  date: string;
  isLoading: boolean;
  errorMessage: string;
  timeZone: string;
  timeSpan: string;
  time: string;
  fetchData: () => Promise<void>;
  handleTimeZoneChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleTimeSpanChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TimeZoneState {
  timeZoneData: timeZoneTypes | null;
  date: string;
  time: string;
  timeZone: string;
  timeSpan: string;
  isLoading: boolean;
  errorMessage: string;
}

const defaultContextValue: ConvertTimeZonesValue = {
  timeZoneData: null,
  date: "",
  isLoading: false,
  errorMessage: "",
  fetchData: async () => {},
  handleTimeZoneChange: () => {},

  handleTimeSpanChange: () => {},
  timeZone: "",
  timeSpan: "",
  time: "",
  handleTimeChange: function (): void {
    throw new Error("Function not implemented.");
  },
  handleDateChange: function (): void {
    throw new Error("Function not implemented.");
  },
};

type Action =
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_ERROR_MESSAGE"; payload: string }
  | { type: "SET_TIMESPAN"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_TIME"; payload: string }
  | { type: "SET_TIMEZONE"; payload: string }
  | { type: "SET_RECEIVED_DATA"; payload: timeZoneTypes }
  | { type: "SET_REQUEST_DATA" };

const initialState: TimeZoneState = {
  timeZoneData: null,
  time: "",
  timeZone: "",
  timeSpan: "",
  date: "",
  isLoading: false,
  errorMessage: "",
};

const DecrementTimeReducer = (state: TimeZoneState, action: Action) => {
  switch (action.type) {
    case "SET_REQUEST_DATA":
      return { ...state, isLoading: true, errorMessage: "" };
    case "SET_DATE":
      return { ...state, timeZoneData: null, date: action.payload };
    case "SET_TIME":
      return { ...state, timeZoneData: null, time: action.payload };
    case "SET_TIMEZONE":
      return { ...state, timeZoneData: null, timeZone: action.payload };
    case "SET_TIMESPAN":
      return { ...state, timeZoneData: null, timeSpan: action.payload };
    case "SET_RECEIVED_DATA":
      return { ...state, isLoading: false, timeZoneData: action.payload };
    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: action.payload, isLoading: false };
    default:
      return state;
  }
};
const DecrementTimeContext = createContext(defaultContextValue)
const DecrementTimeProvider: React.FC<{children : ReactNode}> = ({children}) => {
    const [
      { timeZone, errorMessage, date, isLoading, timeSpan, time, timeZoneData },
      dispatch,
    ] = useReducer(DecrementTimeReducer, initialState);
    const { timeZone: fetchedTimeZone } = useFetchInfo();
    const dateTime = `${date} ${time}`;

    useEffect(
      function setInitialFromTimezone() {
        if (!fetchedTimeZone) return;
        dispatch({ type: "SET_TIMEZONE", payload: fetchedTimeZone });
      },
      [fetchedTimeZone],
    );

    const handleTimeSpanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_TIMESPAN", payload: e.target.value });
    };
    const handleTimeZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch({ type: "SET_TIMEZONE", payload: e.target.value });
    };
    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_TIME", payload: e.target.value });
    };
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_DATE", payload: e.target.value });
    };

    async function fetchData() {
      if (!timeZone || !timeSpan) return;
      const data = {
        timeZone,
        dateTime,
        timeSpan,
        dstAmbiguity: "",
      };
      try {
        dispatch({ type: "SET_REQUEST_DATA" });
        const response = await axios.post(`${proxyURL}${api_url}`, data, {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        dispatch({ type: "SET_RECEIVED_DATA", payload: response.data });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
        dispatch({
          type: "SET_ERROR_MESSAGE",
          payload:
            "An error occurred, check your input / network and try again",
        });
      }
    }

    
      const contextValue = {
        timeZone,
        timeSpan,
        date,
        isLoading,
        errorMessage,
        time,
        timeZoneData,
        handleTimeZoneChange,
        handleTimeSpanChange,
        handleTimeChange,
        handleDateChange,
        fetchData,
      };
    return (
        <DecrementTimeContext.Provider value={contextValue}>
            {children}
        </DecrementTimeContext.Provider>
    )
}

export default DecrementTimeProvider

export const useDecrementTimeContext = ()  => {
  const context = useContext(DecrementTimeContext);
  if (context === undefined) throw new Error("context is undefined");
  return context;
}