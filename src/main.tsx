import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage.tsx";
import IndexPage from "./components/IndexPage.tsx";
import GetTime from "./pages/getTime/GetTime.tsx";
import TimeZone from "./pages/getTime/TimeZone.tsx";
import IpAddress from "./pages/getTime/IpAddress.tsx";
import GeoCoordinates from "./pages/getTime/GeoCoordinates.tsx";
import TimeConversion from "./pages/convertTime/TimeConversion.tsx";
import ConvertTimeZones from "./pages/convertTime/ConvertTimeZones.tsx";
import ConvertToWeek from "./pages/convertTime/ConvertToWeek.tsx";
import ConvertToDay from "./pages/convertTime/ConvertToDay.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import CalculateTime from "./pages/calculateTime/CalculateTime.tsx";
import TimezoneProvider from "./contexts/GetTime/TimezoneContext.tsx";
import IpProvider from "./contexts/GetTime/IpContext.tsx";
import GeoContextProvider from "./contexts/GetTime/GeoContext.tsx";
import ConvertToDayContextProvider from "./contexts/ConvertTime/ConvertToDayContext.tsx";
import ConvertToWeekContextProvider from "./contexts/ConvertTime/ConvertToWeekContext.tsx";
import ConvertTimeZonesProvider from "./contexts/ConvertTime/ConvertTimeZonesContext.tsx";
import IncrementTime from "./pages/calculateTime/IncrementTime.tsx";
import DecrementTime from "./pages/calculateTime/DecrementTime.tsx";
import IncrementTimeProvider from "./contexts/CalculateTime/IncrementTimeContext.tsx";
import DecrementTimeProvider from "./contexts/CalculateTime/DecrementTimeContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "get-time",
        element: <GetTime />,
        children: [
          {
            index: true,
            element: (
              <TimezoneProvider>
                <TimeZone />,
              </TimezoneProvider>
            ),
          },
          {
            path: "IpAddress",
            element: (
              <IpProvider>
                <IpAddress />,
              </IpProvider>
            ),
          },
          {
            path: "GeoCoordinates",
            element: (
              <GeoContextProvider>
                <GeoCoordinates />,
              </GeoContextProvider>
            ),
          },
          // {
          //   path: "IpAddress/:id",
          //   element: <IndexPage />,
          // },
          // Remember to add URL params
        ],
      },
      {
        path: "convert-time",
        element: <TimeConversion />,
        children: [
          {
            index: true,
            element: (
              <ConvertTimeZonesProvider>
                <ConvertTimeZones />,
              </ConvertTimeZonesProvider>
            ),
          },
          {
            path: "convert-to-week",
            element: (
              <ConvertToWeekContextProvider>
                <ConvertToWeek />,
              </ConvertToWeekContextProvider>
            ),
          },
          {
            path: "convert-to-day",
            element: (
              <ConvertToDayContextProvider>
                <ConvertToDay />,
              </ConvertToDayContextProvider>
            ),
          },
        ],
      },
      {
        path: "calculate-time",
        element: <CalculateTime />,
        children: [
          {
            index: true,
            element: (
              <IncrementTimeProvider>
                <IncrementTime />,
              </IncrementTimeProvider>
            ),
          },
          {
            path: "Decrement",
            element: (
              <DecrementTimeProvider>
                <DecrementTime />,
              </DecrementTimeProvider>
            ),
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>,
);
