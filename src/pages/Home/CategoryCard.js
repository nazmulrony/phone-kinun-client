import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    const { name, image } = category;
    return (
        <div className='bg-light p-4 shadow-lg shadow-black/10'>
            <img src={image} alt="" className='hover:scale-105 duration-500' />
            <h2 className='text-2xl mt-4 text-center font-light '>{name}</h2>
            <Link to={`/category/${category._id}`} className='flex justify-center' ><button className='btn btn-primary rounded-none btn-sm my-2 inline-block'>View Products</button></Link>
        </div>
    );
};

export default CategoryCard;