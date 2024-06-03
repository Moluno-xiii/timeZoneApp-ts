import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
} from "react";

const proxyURL = "http://localhost:3000/proxy?url";
const api_url = " https://timeapi.io/api/Conversion/DayOfTheYear";

interface dateDataTypes {
  day: number;
}

interface ConvertToDayContextValue {
  dayData: dateDataTypes | null;
  date: string;
  isLoading: boolean;
  errorMessage: string;
  fetchData: () => Promise<void>;
  dateOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface dayState {
  dayData: dateDataTypes | null;
  date: string;
  isLoading: boolean;
  errorMessage: string;
}

const defaultContextValue: ConvertToDayContextValue = {
  dayData: null,
  date: "",
  isLoading: false,
  errorMessage: "",
  fetchData: async () => {},
  dateOnchange: () => {},
};

type Action =
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_ERROR_MESSAGE"; payload: string }
  | { type: "SET_RECEIVED_DATA"; payload: dateDataTypes }
  | { type: "SET_REQUEST_DATA" };

const initialState: dayState = {
  dayData: null,
  date: "",
  isLoading: false,
  errorMessage: "",
};
const ConvertToDayContext = createContext<ConvertToDayContextValue>(defaultContextValue);

const DateReducer = (state: dayState, action: Action) => {
  switch (action.type) {
    case "SET_REQUEST_DATA":
      return { ...state, isLoading: true, errorMessage: "" };
    case "SET_DATE":
      return { ...state, dayData:null, date: action.payload };
    case "SET_RECEIVED_DATA":
      return { ...state, isLoading: false, dayData: action.payload };
    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: action.payload, isLoading: false };
    default:
      return state;
  }
};

// eslint-disable-next-line react-refresh/only-export-components
const ConvertToDayContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [{ dayData, date, isLoading, errorMessage }, dispatch] = useReducer(
    DateReducer,
    initialState,
  );

  const dateOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_DATE", payload: e.target.value });
  };

  async function fetchData() {
    if (!date) return;
  try {
    dispatch({type: "SET_REQUEST_DATA"})
    const response = await fetch(`${proxyURL}=${api_url}/${date}`);
    const data = await response.json();
    dispatch({type: "SET_RECEIVED_DATA", payload: data})
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
    dayData,
    date,
    isLoading,
    errorMessage,
    dateOnchange
  };

  return (
    <ConvertToDayContext.Provider value={contextValue}>{children}</ConvertToDayContext.Provider>
  );
};

export const useConvertToDayContext = () => {
  const context = useContext(ConvertToDayContext);
  if (context === undefined) throw new Error("context is undefined");
  return context;
};

export default ConvertToDayContextProvider;


