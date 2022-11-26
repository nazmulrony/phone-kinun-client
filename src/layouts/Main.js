import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/shared/Footer';
import Navbar from '../pages/shared/Navbar';

const Main = () => {
    return (
        <div className='min-h-screen  font-lato bg-brand max-w-screen-2xl relative'>
            <Navbar></Navbar>
            <div className='min-h-screen'>
                <Outlet></Outlet>
            </div>
            <Footer />
        </div>
    );
};

export default Main;