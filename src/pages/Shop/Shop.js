import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import BookingModal from '../ProductsOfCategory/BookingModal';
import ProductCard from '../ProductsOfCategory/ProductCard';


const Shop = () => {
    const [selectedProduct, setSelectedProduct] = useState(null)
    const closeModal = () => {
        setSelectedProduct(null);
    }
    const url = 'http://localhost:5000/all-products';
    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => axios.get(url)
            .then(data => {
                // console.log(data);
                return data.data;
            })
    })
    if (isLoading) {
        return <Spinner />
    }
    // console.log(selectedProduct);
    return (
        <div className='my-6 lg:px-16'>
            <h2 className='text-2xl text-primary my-6 text-center hover:text-teal-600 duration-500'>
                {
                    products.length ? `Find the best product for you` : 'No Product Listed'
                }
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
                {
                    products.map(product => <ProductCard
                        key={product._id}
                        product={product}
                        setSelectedProduct={setSelectedProduct}
                    />)
                }
            </div>
            {
                selectedProduct && <BookingModal
                    selectedProduct={selectedProduct}
                    closeModal={closeModal}
                />
            }
        </div>
    );
};

export default Shop;