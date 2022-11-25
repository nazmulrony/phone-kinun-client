import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import AddProduct from "../pages/Dashboard/AddProduct";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyOrders from "../pages/Dashboard/MyOrders";
import MyProducts from "../pages/Dashboard/MyProducts";
import Home from "../pages/Home/Home";
import Login from "../pages/shared/Login";
import Signup from "../pages/shared/Signup";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/dashboard',
                element: <DashboardLayout />,
                children: [
                    {
                        path: '/dashboard',
                        element: <Dashboard />,
                    },
                    {
                        path: '/dashboard/my-orders',
                        element: <MyOrders />,
                    },
                    {
                        path: '/dashboard/add-product',
                        element: <AddProduct />,
                    },
                    {
                        path: '/dashboard/my-products',
                        element: <MyProducts />,
                    },
                ]
            },
        ]
    }
])