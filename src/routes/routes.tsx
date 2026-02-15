import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from '../layouts/basicLayout'
import  Login from '../login'
import UserRegister from '../userRegister'

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
            element: <Layout/>,
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