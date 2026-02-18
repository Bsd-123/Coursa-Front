import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from '../layouts/basicLayout'
import  Login from '../pages/login'
import UserRegister from '../pages/userRegister'
import AuthGuard from '../auth/AuthGuard'
function Routes(){
    
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Login />,
        },
        {
            path: '/register',
            element: <UserRegister/>,
        },
        {
            path: '/OwnerRegister',
            element: <UserRegister/>,
        },
        {
            path: 'home',
            element: <AuthGuard><Layout/></AuthGuard>,
            children: [
                { index: true, element: <h1>Wellcome!</h1> },
                { path: '*', element: <h1>404 Page not found</h1> },
            ],
        }
    ])
    return <>
        <RouterProvider router={router} />
    </>
}
export default Routes