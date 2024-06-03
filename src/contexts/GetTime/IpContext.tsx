import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import useFetchInfo from "../../hooks/useFetchInfo";
import { convertTimeString } from "../../helper/helperFunctions";

const proxyURL = "http://localhost:3000/proxy?url";
const API_URL = "https://timeapi.io/api/TimeZone/ip?ipAddress";

interface ipDataTypes {
  currentLocalTime: string;
  timeZone: string;
  hasDayLightSaving: boolean;
  isDayLightSavingActive: boolean;
}

interface IpContextValue {
  ipData: ipDataTypes | null;
  errorMessage: string;
  formattedTime: string;
  isLoading: boolean;
  ipPlaceholder: string;
  ipPlaceholderOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  FetchIpData: () => Promise<void>;
}

interface TimeZoneState {
  ipData: ipDataTypes | null;
  errorMessage: string;
  ipPlaceholder: string;
  isLoading: boolean;
}

const defaultContextValue: IpContextValue = {
  ipData: null,
  errorMessage: "",
  formattedTime: "",
  isLoading: false,
  ipPlaceholder: "",
  ipPlaceholderOnchange: () => {},
  FetchIpData: async () => {},
};

type Action =
  | { type: "SET_PLACEHOLDER"; payload: string }
  | { type: "SET_ERROR_MESSAGE"; payload: string }
  | { type: "SET_RECEIVED_DATA"; payload: ipDataTypes }
  | { type: "SET_REQUEST_DATA" };

const initialState: TimeZoneState = {
  ipData: null,
  errorMessage: "",
  isLoading: false,
  ipPlaceholder: "",
};
const IpContext = createContext<IpContextValue>(defaultContextValue);

const IpReducer = (state: TimeZoneState, action: Action) => {
  switch (action.type) {
    case "SET_REQUEST_DATA":
      return { ...state, isLoading: true, errorMessage: "" };
    case "SET_PLACEHOLDER":
      return { ...state, ipPlaceholder: action.payload };
    case "SET_RECEIVED_DATA":
      return { ...state, isLoading: false, ipData: action.payload };
    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: action.payload, isLoading: false };
    default:
      return state;
  }
};

// eslint-disable-next-line react-refresh/only-export-components
const IpProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [{ ipData, ipPlaceholder, errorMessage, isLoading }, dispatch] =
    useReducer(IpReducer, initialState);
  const { ipAddress } = useFetchInfo();
  const stringIp = ipAddress ? ipAddress.toString() : "";

  const ipPlaceholderOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_PLACEHOLDER", payload: e.target.value });
  };

  useEffect(() => {
    if (stringIp) {
      dispatch({ type: "SET_PLACEHOLDER", payload: stringIp });
    }
  }, [stringIp]);

  async function FetchIpData() {
    if (!ipPlaceholder) return;
    try {
      dispatch({ type: "SET_REQUEST_DATA" });
      const response = await fetch(`${proxyURL}=${API_URL}=${ipPlaceholder}`);
      const data = await response.json();
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

  const formattedTime = ipData
    ? convertTimeString(ipData.currentLocalTime).newTime
    : "";

  const contextValue = {
    FetchIpData,
    ipPlaceholderOnchange,
    formattedTime,
    ipData,
    errorMessage,
    isLoading,
    ipPlaceholder,
  };

  return (
    <IpContext.Provider value={contextValue}>{children}</IpContext.Provider>
  );
};

export const useIpContext = () => {
  const context = useContext(IpContext);
  if (context === undefined) throw new Error("context is undefined");
  return context;
};

export default IpProvider;
