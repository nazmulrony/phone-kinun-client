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
        <div className='px-4 lg:px-12 lg:py-6'>
            <h3 className='text-2xl text-primary text-center'>My Products</h3>
            {!products.length && <h4 className='text-warning text-2xl text-center'>You haven't added any product yet. </h4>}
            <div className='my-4'>
                <table className='w-full table-auto lg:table-auto'>
                    <thead className='bg-primary text-light'>
                        <tr >
                            <th className='py-2'>S/N</th>
                            <th className='py-2'>Name</th>
                            <th className='py-2'>Price</th>
                            <th className='py-2'>Status</th>
                            <th className='py-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody className=' divide-y divide-gray-300'>
                        {
                            products.map((product, i) =>
                                <tr
                                    className='text-center bg-slate-200 hover:bg-slate-300'
                                    key={product._id}
                                >
                                    <td className='py-4'>{i + 1}</td>
                                    <td className='py-4'>{product.name}</td>
                                    <td className='py-4'>${product.sellingPrice}</td>
                                    <td className={`py-4 ${product.isSold ? 'text-warning' : 'text-success'}`}>{product.isSold ? 'Sold' : 'Available'}</td>
                                    <td className='py-2 flex justify-center flex-col items-center gap-1'>
                                        <button className='btn btn-xs block w-20 btn-success'>Advertise</button>
                                        <button className='btn btn-xs block w-20  btn-error'>Delete</button>
                                    </td>
                                </tr>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyProducts;