import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import BookingModal from './BookingModal';
import ProductCard from './ProductCard';

const ProductsOfCategory = () => {
    const [selectedProduct, setSelectedProduct] = useState(null)
    const closeModal = () => {
        setSelectedProduct(null);
    }
    const location = useLocation();
    const categoryId = location.pathname.split('/').at(-1);
    const url = `http://localhost:5000/category/${categoryId}`;
    const { data: products, isLoading } = useQuery({
        queryKey: ['products', categoryId],
        queryFn: () => axios.get(url)
            .then(data => {
                // console.log(data);
                return data.data;
            })
    })
    if (isLoading) {
        return <Spinner />
    }
    console.log(selectedProduct);
    return (
        <div className='my-6 lg:px-20'>
            <h2 className='text-2xl text-primary my-6 text-center hover:text-teal-600 duration-500'>Find the best product from {products.length && products[0].category}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
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

export default ProductsOfCategory;