import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import GetTime from "./pages/GetTime";
import FindTimeZone from "./pages/FindTimeZone";
import FindIpAddress from "./pages/FindIpAddress";
import TimeConversion from "./pages/TimeConversion";
import CalculateTime from "./pages/CalculateTime";

function App() {
  return (
    <BrowserRouter>
      <div className="max-3xl:justify-center flex h-[100dvh] w-full flex-col items-center py-3">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="getTime" element={<GetTime />} />
          <Route path="convertTime" element={<TimeConversion />} />
          <Route path="findTimeZone" element={<FindTimeZone />} />
          <Route path="findIpAddress" element={<FindIpAddress />} />
          <Route path="calculateTime" element={<CalculateTime />} />
          {/* <Header />
          <AppNav />
          <Test /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
