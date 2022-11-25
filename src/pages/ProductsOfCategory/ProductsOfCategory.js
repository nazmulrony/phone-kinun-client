import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ProductsOfCategory = () => {
    const products = useLoaderData();
    console.log(products);
    return (
        <div className='my-6'>
            <h2 className='text-2xl text-primary text-center hover:text-teal-600 duration-500'>Fidn the best product from {products.length && products[0].category}</h2>
        </div>
    );
};

export default ProductsOfCategory;