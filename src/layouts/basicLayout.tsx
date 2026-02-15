import { NavLink, Outlet } from "react-router-dom"

const Layout = () => {
    return <>
        <header>
            <nav>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="about">About</NavLink>
                <NavLink to="products">Products</NavLink>
            </nav>
        </header>
        <main><Outlet /></main>
        <footer></footer>
    </>
}
export default Layout