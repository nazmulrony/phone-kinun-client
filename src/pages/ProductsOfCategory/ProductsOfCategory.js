import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useLoaderData, useLocation, useNavigation } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import ProductCard from './ProductCard';

const ProductsOfCategory = () => {
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
    return (
        <div className='my-6 lg:px-20'>
            <h2 className='text-2xl text-primary my-6 text-center hover:text-teal-600 duration-500'>Find the best product from {products.length && products[0].category}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    products.map(product => <ProductCard
                        key={product._id}
                        product={product}
                    />)
                }
            </div>
        </div>
    );
};

export default ProductsOfCategory;