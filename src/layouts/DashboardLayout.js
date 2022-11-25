import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MdOutlineDashboard, MdOutlineSpaceDashboard } from 'react-icons/md'

const DashboardLayout = () => {
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
            <div className="drawer-side">
                <label htmlFor="dashboardDrawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li><Link to="/dashboard/my-orders">My Orders</Link></li>
                    <li><Link to="/dashboard/add-product">Add a Product</Link></li>
                    <li><Link to="/dashboard/my-products">My Products</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default DashboardLayout;