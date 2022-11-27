import React from 'react';
import { Link } from 'react-router-dom';
import about from '../../assets/about.jpg';

const AboutUS = () => {
    return (
        <div className="hero py-10 bg-primary/10 lg:px-10 my-8">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={about} alt="" className='lg:w-1/2' />
                <div>
                    <h1 className="text-5xl font-bold">About US</h1>
                    <p className="py-6">We are the largest company that deals with used phones. We aim to serve you with your desired phone at a reasonable price. Let's jump into our shop and find the best phone for you. </p>
                    <Link to="/shop"><button className="btn btn-primary rounded-none">Jump into shop</button></Link>
                </div>
            </div>
        </div>
    );
};

export default AboutUS;