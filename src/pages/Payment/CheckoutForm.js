import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { AuthContext } from '../../contexts/AuthProvider';
import SmallSpinner from '../../components/SmallSpinner';

const CheckoutForm = ({ product }) => {
    const { user } = useContext(AuthContext);
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [processing, setProcessing] = useState(false)
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const { sellingPrice } = product;
    // console.log(product);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sellingPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [sellingPrice]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log(error);
            setCardError(error.message)
        } else {
            setCardError('');
        }
        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,
                    },
                },
            },
        );
        if (confirmError) {
            setCardError(confirmError.message);
        }



        if (paymentIntent.status === "succeeded") {
            const payment = {
                sellingPrice,
                email: user?.email,
                productId: product._id,
                transactionId: paymentIntent.id
            }
            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.acknowledged) {
                        setSuccess('Your payment successfully completed');
                        setTransactionId(paymentIntent.id);
                    }
                })

        }
        setProcessing(false)

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {
                    processing ? <button className='btn btn-sm btn-primary rounded-none my-4'><SmallSpinner /></button> :
                        <button
                            type="submit"
                            className='btn btn-sm btn-primary rounded-none my-4'
                            disabled={!stripe || !clientSecret}
                        >
                            Pay
                        </button>
                }
                {

                }
            </form>
            {
                <p className='text-red-600'>{cardError}</p>
            }
            {
                <p>{success}</p>
            }
            {
                <p>Your transaction ID:{transactionId}</p>
            }
        </>
    );
};

export default CheckoutForm;