import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import useBuyer from '../hooks/useBuyer';


const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email);
    console.log(isAdmin, isSeller, isBuyer);
    return (
        <div className="drawer drawer-mobile">
            <input id="dashboardDrawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* <!-- Page content here --> */}
                <div className='flex justify-end mr-4 mt-2'>
                    <label htmlFor="dashboardDrawer" className="btn btn-primary drawer-button lg:hidden"><MdOutlineSpaceDashboard className='text-2xl' /></label>
                </div>
                <Outlet />

            </div>
            {/* side bar code */}
            <div className='bg-primary '>
                <label htmlFor="dashboardDrawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-primary text-light font-bold gap-1">
                    {/* <!-- Sidebar content here --> */}
                    {
                        isBuyer && <>
                            <li><Link to="/dashboard/my-orders">My Orders</Link></li>
                            <li><Link to="/dashboard/my-wishlist">My Wishlist</Link></li>
                        </>
                    }
                    {
                        isSeller && <>
                            <li><Link to="/dashboard/my-products">My Products</Link></li>
                            <li><Link to="/dashboard/add-product">Add a Product</Link></li>
                        </>
                    }
                    {
                        isAdmin && <>
                            <li><Link to="/dashboard">All Users</Link></li>
                            <li><Link to="/dashboard">All Sellers</Link></li>
                        </>
                    }

                </ul>

            </div>
        </div>
    );
};

export default DashboardLayout;