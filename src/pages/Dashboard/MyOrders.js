
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';
import OrderRow from './OrderRow';

const MyOrders = () => {
    const { user, logOut } = useContext(AuthContext);
    useTitle('My Orders');
    const { data: orders, isLoading } = useQuery({
        queryKey: ['oders', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://phone-kinun-server-nazmulrony.vercel.app/orders/${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            if (res.status === 401 || res.status === 403) {
                logOut();
            }
            const data = res.json();
            return data;
        }
    })
    // console.log(orders);
    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='px-4 lg:px-12 lg:py-6'>
            <h3 className='text-2xl text-primary text-center'>My Orders</h3>
            {!orders.length && <h4 className='text-warning text-xl text-center'>You haven't ordered any product yet. </h4>}
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
                            orders.length ? orders.map((order, i) => <OrderRow
                                key={order._id}
                                productId={order.productId}
                                i={i}
                            />) : null
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyOrders;