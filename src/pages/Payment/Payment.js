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
    // console.log(product);

    return (
        <div className='p-4 lg:p-10  bg-slate-200 max-w-2xl mx-auto shadow-lg shadow-black/10'>
            <div className='mb-6'>
                <h3 className='text-xl my-2'>Complete your payment to confirm the order of <span className='text-primary'>{product.name}</span> </h3>
                <p>Payment Amount: <span className='text-primary'>${product.sellingPrice}</span></p>
            </div>
            <div className=' bg bg-primary/10 max-w-sm mx-auto p-8 h-56 shadow-lg shadow-black/10'>
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