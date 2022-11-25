import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Spinner from '../../components/Spinner';
import CategoryCard from './CategoryCard';

const Categories = () => {

    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => axios.get('http://localhost:5000/categories')
            .then(data => {
                return data.data;
            })
    })
    console.log(categories);
    if (isLoading) {
        return <Spinner />
    }
    return (
        <section className='my-6 '>
            <h2 className='text-2xl text-center text-primary mb-4 hover:text-teal-600 duration-200'>Select the Category You Like</h2>
            <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {
                    categories.map(category => <CategoryCard
                        key={category._id}
                        category={category}
                    />)
                }
            </div>
        </section>
    );
};

export default Categories; 