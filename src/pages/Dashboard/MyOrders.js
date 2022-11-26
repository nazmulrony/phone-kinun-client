
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../contexts/AuthProvider';
import OrderRow from './OrderRow';

const MyOrders = () => {
    const { user } = useContext(AuthContext)
    const { data: orders, isLoading } = useQuery({
        queryKey: ['oders', user?.email],
        queryFn: () => axios(`http://localhost:5000/orders/${user?.email}`)
            .then(data => {
                return data.data
            })
    })
    // console.log(orders);
    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='px-4 lg:px-12 lg:py-6'>
            <h3 className='text-2xl text-primary text-center'>My Orders</h3>
            {!orders.length && <h4 className='text-warning text-2xl text-center'>You haven't ordered any product yet. </h4>}
            <div className='my-4 overflow-x-auto'>
                <table className='w-full shadow-lg shadow-black/10'>
                    <thead className='bg-primary text-light'>
                        <tr >
                            <th className='px-4 py-2'>S/N</th>
                            <th className='px-4 py-2'>Image</th>
                            <th className='px-4 py-2'>Product Name</th>
                            <th className='px-4 py-2'>Price</th>
                            <th className='px-4 py-2'>Brand</th>
                            <th className='px-4 py-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody className=' divide-y divide-gray-300'>
                        {
                            orders.map((order, i) => <OrderRow
                                key={order._id}
                                productId={order.productId}
                                i={i}
                            />)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyOrders;