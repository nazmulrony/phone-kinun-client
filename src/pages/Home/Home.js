import React from 'react';
import Banner from './Banner';
import Categories from './Categories';

const Home = () => {
    return (
        <div className='px-4 md:px-8 lg:px-16 py-6'>
            <Banner />
            <Categories />
        </div>
    );
};

export default Home;