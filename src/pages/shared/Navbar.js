import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [navbar, setNavbar] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        logOut();
        navigate('/login')
    }
    return (
        <nav className="w-full sticky bg-brand top-0 z-20">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:block">
                        <Link to="/">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <img src={logo} alt="" className='h-12' />
                                <span className=''>Phone</span> Kinun
                            </h2>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-gray-600 hover:text-primary font-semibold">
                                <NavLink className={({ isActive }) => isActive ? 'text-primary underline underline-offset-2' : undefined} to="/">Home</NavLink>
                            </li>
                            <li className="text-gray-600 hover:text-primary font-semibold">
                                <NavLink className={({ isActive }) => isActive ? 'text-primary underline underline-offset-2' : undefined} to="/shop">Shop</NavLink>
                            </li>
                            <li className="text-gray-600 hover:text-primary font-semibold">
                                <NavLink className={({ isActive }) => isActive ? 'text-primary underline underline-offset-2' : undefined} to="/blog">Blog</NavLink>
                            </li>

                            {
                                user ?
                                    <>
                                        <li className="text-gray-600 hover:text-primary font-semibold">
                                            <NavLink className={({ isActive }) => isActive ? 'text-primary underline underline-offset-2' : undefined} to="/dashboard">Dashboard</NavLink>
                                        </li>
                                        <li className="text-gray-600 hover:text-primary font-semibold">
                                            <button onClick={handleLogout}> Logout</button>
                                        </li></>
                                    :
                                    <>
                                        <li className="text-gray-600 hover:text-primary font-semibold">
                                            <NavLink className={({ isActive }) => isActive ? 'text-primary underline underline-offset-2' : undefined} to="/login">Login</NavLink>
                                        </li>
                                        <li className="text-gray-600 hover:text-primary font-semibold">
                                            <NavLink className={({ isActive }) => isActive ? 'text-primary underline underline-offset-2' : undefined} to="/signup">Sign Up</NavLink>
                                        </li>
                                    </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <hr />
        </nav>
    );
};

export default Navbar;