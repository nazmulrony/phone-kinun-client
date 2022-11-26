import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../contexts/AuthProvider';
import ConfirmationModal from '../shared/ConfirmationModal';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null)
    const url = `http://localhost:5000/products?email=${user?.email}`
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: () => axios.get(url)
            .then(data => {
                // console.log(data);
                return data.data;
            })

    })
    const handleDeleteProduct = (product) => {
        fetch(`http://localhost:5000/products/delete/${product._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Product successfully deleted')
                    refetch()
                }
            })

    }

    if (isLoading) {
        return <Spinner />
    }


    return (
        <div className='px-4 lg:px-12 lg:py-6'>
            <h3 className='text-2xl text-primary text-center'>My Products</h3>
            {!products.length && <h4 className='text-warning text-2xl text-center'>You haven't added any product yet. </h4>}
            <div className='my-4'>
                <table className='w-full table-auto lg:table-auto shadow-lg shadow-black/10'>
                    <thead className='bg-primary text-light'>
                        <tr >
                            <th className='px-4 py-2'>S/N</th>
                            <th className='px-4 py-2'>Name</th>
                            <th className='px-4 py-2'>Price</th>
                            <th className='px-4 py-2'>Status</th>
                            <th className='px-4 py-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody className=' divide-y divide-gray-300'>
                        {
                            products.map((product, i) =>
                                <tr
                                    className='text-center bg-slate-200 hover:bg-slate-300'
                                    key={product._id}
                                >
                                    <td className='py-4 px-4'>{i + 1}</td>
                                    <td className='py-4 px-4'>{product.name}</td>
                                    <td className='py-4 px-4'>${product.sellingPrice}</td>
                                    <td className={`py-4 px-4 ${product.isSold ? 'text-warning' : 'text-success'}`}>{product.isSold ? 'Sold' : 'Available'}</td>
                                    <td className='py-2 px-4 flex justify-center flex-col items-center gap-1'>
                                        <button className='btn btn-xs  w-20 btn-success'>Advertise</button>
                                        <label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-modal" className="btn btn-xs w-20 btn-error ">Delete</label>
                                    </td>
                                </tr>)
                        }
                    </tbody>


                </table>
            </div>
            {
                deletingProduct && <ConfirmationModal
                    title={'Are you sure you want to delete?'}
                    message={`If you delete ${deletingProduct.name}, You can not recover it!`}
                    modalData={deletingProduct}
                    successAction={handleDeleteProduct}
                    successBtnName={'Confirm'}
                />
            }
        </div>
    );
};

export default MyProducts;