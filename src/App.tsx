import AppNav from "./components/AppNav";
import Header from "./components/Header";
import Test from "./components/Test";

function App() {
  return (
    <div className="flex justify-center py-3 flex-col items-center h-[100dvh] w-full">
      <Header />
      <AppNav />
      <Test />
    </div>
  );
}

export default App;
