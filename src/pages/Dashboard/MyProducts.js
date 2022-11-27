import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';
import ConfirmationModal from '../shared/ConfirmationModal';

const MyProducts = () => {
    const { user, logOut } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null);
    useTitle('My Product')
    const url = `http://localhost:5000/products?email=${user?.email}`
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
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
    //delete product
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
    //add to advertise
    const handleAdvertise = (product) => {
        const advertiseItem = {
            productId: product._id
        }
        fetch('http://localhost:5000/advertise', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(advertiseItem)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === 'sold') {
                    toast.error('Sold products can not be advertised.')
                }
                else if (data.acknowledged) {
                    toast.success('Product added to advertised product list')
                } else {
                    toast.error('Already in advertised product list')
                }
            })
    }

    if (isLoading) {
        return <Spinner />
    }


    return (
        <div className='px-4 lg:px-12 lg:py-6'>
            <h3 className='text-2xl text-primary text-center'>My Products</h3>
            {!products.length && <h4 className='text-warning text-xl text-center'>You haven't added any product yet. </h4>}
            <div className='my-4 overflow-x-auto'>
                <table className='w-full shadow-lg shadow-black/10'>
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
                            products.length ? products.map((product, i) =>
                                <tr
                                    className='text-center bg-slate-200 hover:bg-slate-300'
                                    key={product._id}
                                >
                                    <td className='py-4 px-4'>{i + 1}</td>
                                    <td className='py-4 px-4'>{product.name}</td>
                                    <td className='py-4 px-4'>${product.sellingPrice}</td>
                                    <td className={`py-4 px-4 ${product.isSold ? 'text-warning' : 'text-success'}`}>{product.isSold ? 'Sold' : 'Available'}</td>
                                    <td className='py-2 px-4 flex justify-center flex-col items-center gap-1'>
                                        <button onClick={() => handleAdvertise(product)} className='btn btn-xs  w-20 btn-success'>Advertise</button>
                                        <label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-modal" className="btn btn-xs w-20 btn-error ">Delete</label>
                                    </td>
                                </tr>) : null
                        }
                    </tbody>


                </table>
            </div>
            {
                deletingProduct && <ConfirmationModal
                    title={'Are you sure you want to delete?'}
                    message={`If you delete ${deletingProduct.name}, If you do so, you can not recover it!`}
                    modalData={deletingProduct}
                    successAction={handleDeleteProduct}
                    successBtnName={'Confirm'}
                />
            }
        </div>
    );
};

export default MyProducts;