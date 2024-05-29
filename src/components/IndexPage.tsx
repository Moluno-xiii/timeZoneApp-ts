import { Outlet } from "react-router-dom";
import Header from "./Header";

const IndexPage: React.FC = () => {
  return (
    <div className="flex h-[100dvh] w-full flex-col items-center py-3 text-center max-3xl:justify-center max-md:px-3">
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default IndexPage;
