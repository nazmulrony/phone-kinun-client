import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Spinner from '../../components/Spinner';
import AdvertisedCard from './AdvertisedCard';

const Advertised = () => {

    const { data: advertises, isLoading } = useQuery({
        queryKey: ['advertises'],
        queryFn: () => axios.get('http://localhost:5000/advertise')
            .then(data => {
                return data.data;
            })
    })
    console.log(advertises);
    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            {
                advertises.length &&
                <section className='my-12 lg:mt-24 '>
                    <h2 className='text-2xl text-center text-primary mb-6 hover:text-teal-600 duration-200'>Advertised Products</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {
                            advertises.map(ad => <AdvertisedCard
                                key={ad._id}
                                productId={ad.productId}
                            />)
                        }
                    </div>
                </section>
            }
        </>
    );
};

export default Advertised;