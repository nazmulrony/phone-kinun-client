import React from 'react';
import { Link } from 'react-router-dom';
import hero from '../../assets/hero.jpg';

const Banner = () => {
    return (
        <div className='lg:-mx-16 -my-6 bg-neutral py-4 md:py-24 mb-12 lg:mb-20'>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2 px-4 lg:px-16'>
                <div className='text-light'>
                    <h1 className='text-4xl lg:text-7xl font-semibold'>Spend Small and Have Great Phones at <span className='text-primary'>Phone</span> <span className='text-primary'>Kinun</span></h1>
                    <Link to="/"><button className='btn btn-primary my-3'>Explore Phones</button></Link>
                </div>
                <div className='row-start-1 md:col-start-2'>
                    <img src={hero} alt="" />
                </div>
            </div>
        </div>

    );
};

export default Banner;