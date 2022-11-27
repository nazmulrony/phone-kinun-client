import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';
import WishlistRow from './WishlistRow';

const MyWishlist = () => {
    const { user, logOut } = useContext(AuthContext);
    useTitle('My Wishlist');
    const { data: wishlist, isLoading } = useQuery({
        queryKey: ['wishlist', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/wishlist/${user?.email}`, {
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
    // console.log(wishlist);
    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='px-4 lg:px-12 lg:py-6'>
            <h3 className='text-2xl text-primary text-center'>My Wishlist</h3>
            {!wishlist.length && <h4 className='text-warning text-xl text-center'>You haven't added any product to wishlist. </h4>}
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
                            wishlist.length ? wishlist.map((list, i) => <WishlistRow
                                key={list._id}
                                productId={list.productId}
                                i={i}
                            />) : null
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyWishlist;