import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../contexts/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/products?email=${user?.email}`
    const { data: products, isLoading } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: () => axios.get(url)
            .then(data => {
                console.log(data);
                return data.data;
            })

    })

    if (isLoading) {
        return <Spinner />
    }


    return (
        <div className='lg:px-12 lg:py-6'>
            <h3 className='text-2xl text-primary text-center'>My Products</h3>
            <div className='my-4'>
                <table className='w-full'>
                    <tr className='bg-primary text-light'>
                        <th className='px-6 py-2'>SL</th>
                        <th className='px-6 py-2'>Name</th>
                        <th className='px-6 py-2'>Price</th>
                        <th className='px-6 py-2'>Status</th>
                        <th className='px-6 py-2'>Action</th>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;