import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const OrderRow = ({ productId, i, }) => {
    const { data: product = [] } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => axios.get(`https://phone-kinun-server-nazmulrony.vercel.app/products/${productId}`)
            .then(data => {
                return data.data;
            })
    })


    return (
        <>
            {
                product && <tr
                    className='text-center bg-slate-200 hover:bg-slate-300'
                    key={product._id}
                >
                    <td className='py-4 px-4'>{i + 1}</td>
                    <td className='py-2 px-4 grid place-items-center'>
                        <div className="w-24 mask mask-squircle overflow-hidden">
                            <img src={product.image} alt="doctor-img" className='w-full' />
                        </div>
                    </td>
                    <td className='py-4 px-4'>{product.name}</td>
                    <td className='py-4 px-4'>${product.sellingPrice}</td>
                    <td className={`py-4 px-4`}>{product.category}</td>
                    <td className='py-2 px-4'>
                        <Link to={`/dashboard/payment/${product._id}`}>
                            <button disabled={product.isSold} className='btn btn-sm block w-20 btn-primary my-auto mx-auto'>Pay</button>
                        </Link>
                    </td>
                </tr>
            }

        </>

    );
};

export default OrderRow;