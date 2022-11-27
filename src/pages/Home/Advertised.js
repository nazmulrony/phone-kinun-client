import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../contexts/AuthProvider';
import AdvertisedCard from './AdvertisedCard';

const Advertised = () => {
    const { user } = useContext(AuthContext);
    const { data: advertises, isLoading } = useQuery({
        queryKey: ['advertises'],
        queryFn: async () => {
            const res = await fetch('https://phone-kinun-server-nazmulrony.vercel.app/advertise', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = res.json();
            return data;
        }
    })
    // console.log(advertises);
    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            {
                user && advertises.length &&
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