import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import Blog from "../pages/Blog/Blog";
import AddProduct from "../pages/Dashboard/AddProduct";
import AllBuyers from "../pages/Dashboard/AllBuyers";
import AllSellers from "../pages/Dashboard/AllSellers";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyOrders from "../pages/Dashboard/MyOrders";
import MyProducts from "../pages/Dashboard/MyProducts";
import MyWishlist from "../pages/Dashboard/MyWishlist";
import Home from "../pages/Home/Home";
import Payment from "../pages/Payment/Payment";
import ProductsOfCategory from "../pages/ProductsOfCategory/ProductsOfCategory";
import ErrorPage from "../pages/shared/ErrorPage";
import Login from "../pages/shared/Login";
import Signup from "../pages/shared/Signup";
import Shop from "../pages/Shop/Shop";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

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
                path: '/home',
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
                path: '/category/:id',
                element: <PrivateRoute><ProductsOfCategory /></PrivateRoute>,
            },
            {
                path: '/shop',
                element: <Shop />,
            },
            {
                path: '/blog',
                element: <Blog />,
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
                        element: <BuyerRoute><MyOrders /></BuyerRoute>,
                    },
                    {
                        path: '/dashboard/my-wishlist',
                        element: <BuyerRoute><MyWishlist /></BuyerRoute>,
                    },
                    {
                        path: '/dashboard/add-product',
                        element: <SellerRoute><AddProduct /></SellerRoute>,
                    },
                    {
                        path: '/dashboard/my-products',
                        element: <SellerRoute><MyProducts /></SellerRoute>,
                    },
                    {
                        path: '/dashboard/payment/:id',
                        element: <BuyerRoute><Payment /></BuyerRoute>,
                        loader: ({ params }) => fetch(`https://phone-kinun-server-nazmulrony.vercel.app/products/${params.id}`)
                    },
                    {
                        path: '/dashboard/buyers',
                        element: <AdminRoute><AllBuyers /></AdminRoute>
                    },
                    {
                        path: '/dashboard/sellers',
                        element: <AdminRoute><AllSellers /></AdminRoute>
                    },
                ]
            },
        ]
    },
    {
        path: '/*',
        element: <ErrorPage />
    }
])