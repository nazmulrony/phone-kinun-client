import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const productId = location.pathname.split('/').at(-1);

    const { data: product = [] } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => axios.get(`http://localhost:5000/products/${productId}`)
            .then(data => {
                return data.data;
            })
    })
    console.log(product);

    return (
        <div>
            Payment
        </div>
    );
};

export default Payment;