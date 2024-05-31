import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { convertTimeString } from "../../helper/helperFunctions";
import { useGeolocation } from "../../hooks/useGeolocation";

const proxyURL = "http://localhost:3000/proxy?url";
const API_URL = "https://timeapi.io/api/TimeZone/coordinate?";

interface geoDataTypes {
  currentLocalTime: string;
  timeZone: string;
  hasDayLightSaving: boolean;
  isDayLightSavingActive: boolean;
}

interface geoContextValue {
  geoData: geoDataTypes | null;
  errorMessage: string;
  latitude: number | null;
  longitude: number | null;
  formattedTime: string;
  isLoading: boolean;
  longitudeOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  latitudeOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fetchTimezoneInfo: () => Promise<void>;
}

interface geoDataState {
  geoData: geoDataTypes | null;
  errorMessage: string;
  isLoading: boolean;
  latitude: number | null;
  longitude: number | null;
}

const defaultContextValue: geoContextValue = {
  geoData: null,
  errorMessage: "",
  formattedTime: "",
  latitude: null,
  longitude: null,
  isLoading: false,
  longitudeOnchange: () => {},
  latitudeOnchange: () => {},
  fetchTimezoneInfo: async () => {},
};

type Action =
  | { type: "SET_LATITUDE"; payload: number }
  | { type: "SET_LONGITUDE"; payload: number }
  | { type: "SET_ERROR_MESSAGE"; payload: string }
  | { type: "SET_RECEIVED_DATA"; payload: geoDataTypes }
  | { type: "SET_REQUEST_DATA" };

const initialState: geoDataState = {
  geoData: null,
  errorMessage: "",
  isLoading: false,
  latitude: null,
  longitude: null,
};
const IpContext = createContext<geoContextValue>(defaultContextValue);

const IpReducer = (state: geoDataState, action: Action) => {
  switch (action.type) {
    case "SET_REQUEST_DATA":
      return { ...state, isLoading: true, errorMessage: "" };
    case "SET_LATITUDE":
      return { ...state, latitude: action.payload };
    case "SET_LONGITUDE":
      return { ...state, longitude: action.payload };
    case "SET_RECEIVED_DATA":
      return { ...state, isLoading: false, geoData: action.payload };
    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: action.payload, isLoading: false };
    default:
      return state;
  }
};

// eslint-disable-next-line react-refresh/only-export-components
const GeoContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [{ geoData, latitude, longitude, errorMessage, isLoading }, dispatch] =
    useReducer(IpReducer, initialState);

  const { position } = useGeolocation();

  const latitudeOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    dispatch({ type: "SET_LATITUDE", payload: isNaN(value) ? 0 : value });
  };
  const longitudeOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    dispatch({ type: "SET_LONGITUDE", payload: isNaN(value) ? 0 : value });
  };

  useEffect(() => {
    if (position) {
      dispatch({ type: "SET_LATITUDE", payload: position?.lat });
      dispatch({ type: "SET_LONGITUDE", payload: position?.lng });
    }
    console.log(position);
  }, [position]);

  async function fetchTimezoneInfo() {
    try {
      dispatch({ type: "SET_REQUEST_DATA" });
      const response = await fetch(
        `${proxyURL}=${API_URL}latitude=${latitude}&longitude=${longitude}`,
      );
      const data = await response.json();
      console.log(data);
      console.log(position);
      dispatch({ type: "SET_RECEIVED_DATA", payload: data });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: "failed to fetch, check your input",
      });
    }
  }

  const formattedTime = geoData
    ? convertTimeString(geoData.currentLocalTime).newTime
    : "";

  const contextValue = {
    fetchTimezoneInfo,
    latitudeOnchange,
    longitudeOnchange,
    latitude,
    longitude,
    errorMessage,
    isLoading,
    geoData,
    formattedTime,
  };

  return (
    <IpContext.Provider value={contextValue}>{children}</IpContext.Provider>
  );
};

export const useGeoContext = () => {
  const context = useContext(IpContext);
  if (context === undefined) throw new Error("context is undefined");
  return context;
};

export default GeoContextProvider;
