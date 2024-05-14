import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import GetTime from "./pages/getTime/GetTime";
import FindTimeZone from "./pages/FindTimeZone";
import FindIpAddress from "./pages/FindIpAddress";
import TimeConversion from "./pages/TimeConversion";
import CalculateTime from "./pages/CalculateTime";
import TimeZone from "./pages/getTime/TimeZone";
import IpAddress from "./pages/getTime/IpAddress";
import GeoCoordinates from "./pages/getTime/GeoCoordinates";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div className="flex h-[100dvh] w-full flex-col items-center py-3 max-3xl:justify-center">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="getTime" element={<GetTime />}>
            <Route path="timezone" element={<TimeZone />} />
            <Route path="IPaddress" element={<IpAddress />} />
            <Route path="geoCoordinates" element={<GeoCoordinates />} />
          </Route>
          <Route path="convertTime" element={<TimeConversion />} />
          <Route path="findTimeZone" element={<FindTimeZone />} />
          <Route path="findIpAddress" element={<FindIpAddress />} />
          <Route path="calculateTime" element={<CalculateTime />} />
          <Route path="*" element={<PageNotFound />} />
          {/* <Header />
          <AppNav />
          <Test /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
