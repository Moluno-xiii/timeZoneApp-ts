import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import useFetchInfo from "../../hooks/useFetchInfo";

const proxyURL = "http://localhost:3000/proxy?url=";
const api_url = " https://timeapi.io/api/Conversion/ConvertTimeZone";

interface timeZoneTypes {
  conversionResult: {
    date: string;
    dateTime: string;
    dstActive: boolean;
    timeZone: string;
  };
  fromTimezone: string;
  toTimeZone: string;
  fromDateTime: string;
}

interface ConvertTimeZonesValue {
  timeZoneData: timeZoneTypes | null;
  date: string;
  isLoading: boolean;
  errorMessage: string;
  fromTimeZone: string;
  toTimeZone: string;
  time: string;
  fetchData: () => Promise<void>;
  handleFromTimeZoneChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleToTimeZoneChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TimeZoneState {
  timeZoneData: timeZoneTypes | null;
  date: string;
  time: string;
  fromTimeZone: string;
  toTimeZone: string;
  isLoading: boolean;
  errorMessage: string;
}

const defaultContextValue: ConvertTimeZonesValue = {
  timeZoneData: null,
  date: "",
  isLoading: false,
  errorMessage: "",
  fetchData: async () => {},
  handleFromTimeZoneChange: () => {},

  handleToTimeZoneChange: () => {},
  fromTimeZone: "",
  toTimeZone: "",
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
  | { type: "SET_TO_TIMEZONE"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_TIME"; payload: string }
  | { type: "SET_FROM_TIMEZONE"; payload: string }
  | { type: "SET_RECEIVED_DATA"; payload: timeZoneTypes }
  | { type: "SET_REQUEST_DATA" };

const initialState: TimeZoneState = {
  timeZoneData: null,
  time: "",
  fromTimeZone: "",
  toTimeZone: "",
  date: "",
  isLoading: false,
  errorMessage: "",
};
const ConvertTimeZonesContext =
  createContext<ConvertTimeZonesValue>(defaultContextValue);

const IpReducer = (state: TimeZoneState, action: Action) => {
  switch (action.type) {
    case "SET_REQUEST_DATA":
      return { ...state, isLoading: true, errorMessage: "" };
    case "SET_DATE":
      return { ...state, timeZoneData: null, date: action.payload };
    case "SET_TIME":
      return { ...state, timeZoneData: null, time: action.payload };
    case "SET_FROM_TIMEZONE":
      return { ...state, timeZoneData: null, fromTimeZone: action.payload };
    case "SET_TO_TIMEZONE":
      return { ...state, timeZoneData: null, toTimeZone: action.payload };
    case "SET_RECEIVED_DATA":
      return { ...state, isLoading: false, timeZoneData: action.payload };
    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: action.payload, isLoading: false };
    default:
      return state;
  }
};

// eslint-disable-next-line react-refresh/only-export-components
const ConvertTimeZonesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [
    {
      fromTimeZone,
      errorMessage,
      date,
      isLoading,
      toTimeZone,
      time,
      timeZoneData,
    },
    dispatch,
  ] = useReducer(IpReducer, initialState);
  const { timeZone } = useFetchInfo();
  const dateTime = `${date} ${time}`;

  useEffect(
    function setInitialFromTimezone() {
      if (!timeZone) return;
      dispatch({ type: "SET_FROM_TIMEZONE", payload: timeZone });
    },
    [timeZone],
  );

  const handleToTimeZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SET_TO_TIMEZONE", payload: e.target.value });
  };
  const handleFromTimeZoneChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch({ type: "SET_FROM_TIMEZONE", payload: e.target.value });
  };
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_TIME", payload: e.target.value });
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_DATE", payload: e.target.value });
  };

  async function fetchData() {
    if (!fromTimeZone || !toTimeZone) return;
    const data = {
      fromTimeZone,
      dateTime,
      toTimeZone,
      dstAmbiguity: "",
    };
    try {
        dispatch({type:"SET_REQUEST_DATA"})
      const response = await axios.post(`${proxyURL}${api_url}`, data, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({type:"SET_RECEIVED_DATA", payload: response.data})
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
    fromTimeZone,
    toTimeZone,
    date,
    isLoading,
    errorMessage,
    time,
    timeZoneData,
    handleFromTimeZoneChange,
    handleToTimeZoneChange,
    handleTimeChange,
    handleDateChange,
    fetchData,
  };

  return (
    <ConvertTimeZonesContext.Provider value={contextValue}>
      {children}
    </ConvertTimeZonesContext.Provider>
  );
};

export const useConvertTimeZonesContext = () => {
  const context = useContext(ConvertTimeZonesContext);
  if (context === undefined) throw new Error("context is undefined");
  return context;
};

export default ConvertTimeZonesProvider;
