import React from 'react';
import { Link } from 'react-router-dom';
import error from '../../assets/error.png'

const ErrorPage = () => {
    return (
        <div className='h-screen grid place-items-center'>
            <div className='text-center'>
                <img src={error} alt="" className='w-1/3 mx-auto' />
                <h3 className='my-2 text-xl text-warning'>Page not found! <Link to="/"><button className=' btn-link text-primary'>Back to Home</button></Link></h3>
            </div>
        </div>
    );
};

export default ErrorPage;