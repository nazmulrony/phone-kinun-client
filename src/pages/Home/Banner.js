import React from 'react';
import { Link } from 'react-router-dom';
import hero from '../../assets/hero.jpg';

const Banner = () => {
    return (

        // <div className='grid grid-cols-1 lg:grid-cols-4 bg-primary  lg:px-20 py-6 lg:py-20'>
        //     <div className='lg:col-span-2 grid place-items-center '>
        //         <div>
        //             <h1 className='text-4xl lg:text-7xl font-semibold'>Spend Small and Have Great Phones at <span className='text-brand'>Phone</span> <span className='text-brand'>Kinun</span></h1>
        //             <Link to="/services"><button className='btn btn-brand my-3'>Explore Services</button></Link>
        //         </div>
        //     </div>
        //     <div className='row-start-1 lg:col-start-4 lg:col-span-2 mb-4 grid place-items-center'>
        //         <img src={hero} alt=" " className=' w-full' />
        //     </div>

        // </div>
        <div className='lg:-mx-16 bg-neutral py-4 md:py-20 mb-12 lg:mb-20'>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2 px-4 lg:px-16'>
                <div className='text-light'>
                    <h1 className='text-4xl lg:text-7xl font-semibold'>Spend Small and Have Great Phones at <span className='text-primary'>Phone</span> <span className='text-primary'>Kinun</span></h1>
                    <Link to="/services"><button className='btn btn-primary my-3'>Explore Services</button></Link>
                </div>
                <div className='row-start-1 md:col-start-2'>
                    <img src={hero} alt="" />
                </div>

            </div>


        </div>

    );
};

export default Banner;