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
import CalculateTime from "./pages/CalculateTime.tsx";
import TimezoneProvider from "./contexts/TimezoneContext.tsx";

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
            element: <IpAddress />,
          },
          {
            path: "GeoCoordinates",
            element: <GeoCoordinates />,
          },
        ],
      },
      {
        path: "convert-time",
        element: <TimeConversion />,
        children: [
          {
            index: true,
            element: <ConvertTimeZones />,
          },
          {
            path: "convert-to-week",
            element: <ConvertToWeek />,
          },
          {
            path: "convert-to-day",
            element: <ConvertToDay />,
          },
        ],
      },
      {
        path: "calculate-time",
        element: <CalculateTime />,
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
