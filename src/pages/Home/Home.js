import React, { useContext } from 'react';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';
import AboutUS from './AboutUS';
import Advertised from './Advertised';
import Banner from './Banner';
import Categories from './Categories';

const Home = () => {
    const { loading } = useContext(AuthContext)
    useTitle('Home');
    if (loading) {
        return <Spinner />
    }
    return (
        <div className='px-4 md:px-8 lg:px-16 py-6'>
            <Banner />
            <Categories />
            <Advertised />
            <AboutUS />
        </div>
    );
};

export default Home;