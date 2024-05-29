import { NavLink, Outlet } from "react-router-dom"

const IndexPage: React.FC = () => {
    return (
      <div className="flex h-[100dvh] w-full flex-col items-center py-3 text-center max-3xl:justify-center max-md:px-3">
        <nav>
          <NavLink to="/" className="text-2xl font-bold">
            Home
          </NavLink>
        </nav>

        <main>
          <Outlet />
        </main>
      </div>
    );
}

export default IndexPage
