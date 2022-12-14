import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const WishlistRow = ({ productId, i }) => {
    const { data: product = [] } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => axios.get(`https://phone-kinun-server-nazmulrony.vercel.app/products/${productId}`)
            .then(data => {
                return data.data;
            })
    })
    // console.log(product);
    return (
        <>
            {
                product && !product.isSold && <tr
                    className='text-center bg-slate-200 hover:bg-slate-300'
                    key={product._id}
                >
                    <td className='py-4 px-4'>{i + 1}</td>
                    <td className='py-2 px-4 grid place-items-center'>
                        <div className='w-24 mask mask-squircle'>
                            <img src={product.image} alt="doctor-img" className='w-full' />
                        </div>
                    </td>
                    <td className='py-4 px-4'>{product.name}</td>
                    <td className='py-4 px-4'>${product.sellingPrice}</td>
                    <td className={`py-4 px-4`}>{product.category}</td>
                    <td className='py-2 px-4'>
                        <Link to={`/dashboard/payment/${product._id}`}><button className='btn btn-sm block  btn-primary my-auto mx-auto'>Proceed to Purchase</button></Link>
                    </td>
                </tr>
            }</>
    );
};

export default WishlistRow;