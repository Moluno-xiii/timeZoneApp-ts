import { NavLink, Outlet } from "react-router-dom"

const IndexPage: React.FC = () => {
    return (
        <div>
            <nav>
                <NavLink to="/" className="text-2xl font-bold">
                    Home
                </NavLink>
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default IndexPage
