const AppNav: React.FC = () => {
  return (
    <nav className="text-center ">
      <ul>
        <li className="mb-6 bg-red-400 text-blue-400 text-2xl">
          Convert Time using Timezone name
        </li>
        <li className="mb-4 bg-red-400 text-black">
          Convert Time using Coordinates
        </li>
        <li className="mb-4 bg-red-400 text-black">
          Convert time using Ip address
        </li>
        <li className="text-white ">name</li>
        <li className="mb-4 bg-red-400 text-black">
          Convert time using city address
        </li>

        <li className="mb-[80px] bg-red-400 text-black">Get time</li>
        <li>Get time</li>

        <li className="mb-4 bg-red-400 text-black">Time conversion</li>

        <li className="mb-4 bg-red-400 text-black">
          Calculate Time by incrementing or decrementing
        </li>
        <li className="mb-4 bg-red-400 text-black">
          Don't know your timezone, check it here
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;
