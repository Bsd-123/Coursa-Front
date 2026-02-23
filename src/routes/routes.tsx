import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from '../layouts/basicLayout'
import  Login from '../pages/login'
import UserRegister from '../pages/userRegister'
import AuthGuard from '../auth/AuthGuard'
import OwnerRegister from "../pages/ownerRegister"
import HomePage from "../pages/homePage"
function Routes(){
    
    const router = createBrowserRouter([
       {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/register',
            element: <UserRegister/>,
        },
        {
            path: '/OwnerRegister',
            element: <AuthGuard><OwnerRegister/></AuthGuard>,
        },
        {
            path: '/',
            element: <AuthGuard><Layout/></AuthGuard>,
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