import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from '../layouts/basicLayout'
import Login from '../pages/login'
import UserRegister from '../pages/userRegister'
import AuthGuard from '../auth/AuthGuard'
import OwnerRegister from "../pages/ownerRegister"
<<<<<<< HEAD
function Routes() {

    const router = createBrowserRouter([
        {
=======
import HomePage from "../pages/homePage"
function Routes(){
    
    const router = createBrowserRouter([
       {
>>>>>>> 4f2870edf90c89ca3fc26234e2f3f29b1e26c9cf
            path: '/login',
            element: <Login />,
        },
        {
            path: '/register',
            element: <UserRegister />,
        },
        {
            path: '/OwnerRegister',
<<<<<<< HEAD
            element: <AuthGuard><OwnerRegister /></AuthGuard>,
        },
        {
            path: 'home',
            element: <AuthGuard><Layout /></AuthGuard>,
=======
            element: <AuthGuard><OwnerRegister/></AuthGuard>,
        },
        {
            path: '/',
            element: <AuthGuard><Layout/></AuthGuard>,
>>>>>>> 4f2870edf90c89ca3fc26234e2f3f29b1e26c9cf
            children: [
                { path: 'home', element: <HomePage/> },
                { path: 'about', element: <h1>About Us</h1> }, 
                { path: 'products', element: <h1>Our Products</h1> },
                { index: true, element: <h1>Wellcome!</h1> },
                { path: '*', element: <h1>404 Page not found</h1> },
            ],
        },
    ])
    return <>
        <RouterProvider router={router} />
    </>
}
export default Routes