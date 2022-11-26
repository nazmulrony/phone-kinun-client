import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);

const Payment = () => {
    const product = useLoaderData();
    // const location = useLocation();
    // const productId = location.pathname.split('/').at(-1);

    // const { data: product = [] } = useQuery({
    //     queryKey: ['product', productId],
    //     queryFn: () => axios.get(`http://localhost:5000/products/${productId}`)
    //         .then(data => {
    //             return data.data;
    //         })
    // })
    console.log(product);

    return (
        <div className='p-20'>
            Payment
            <div className=' bg bg-red-300 max-w-sm p-8'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        product={product}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;