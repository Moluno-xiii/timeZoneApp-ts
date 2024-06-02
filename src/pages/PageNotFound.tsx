import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <div className="flex h-[100dvh] items-center flex-col justify-center text-2xl font-bold ">
        <Link to="/" className="text-red-700 hover:underline">Home Page</Link>
      <p>Page Not Found</p>
    </div>
  );
};

export default PageNotFound;
