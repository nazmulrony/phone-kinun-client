import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Spinner from '../../components/Spinner';

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
        <div>

        </div>
    );
};

export default Categories; 