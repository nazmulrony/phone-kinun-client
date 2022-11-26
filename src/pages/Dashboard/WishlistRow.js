import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const WishlistRow = ({ productId, i }) => {
    const { data: product = [] } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => axios.get(`http://localhost:5000/products/${productId}`)
            .then(data => {
                return data.data;
            })
    })
    console.log(product);
    return (
        <>
            {
                product && <tr
                    className='text-center bg-slate-200 hover:bg-slate-300'
                    key={product._id}
                >
                    <td className='py-4 px-4'>{i + 1}</td>
                    <td className='py-2 px-4 grid place-items-center'>
                        <div className="w-24 mask mask-squircle">
                            <img src={product.image} alt="doctor-img" />
                        </div>
                    </td>
                    <td className='py-4 px-4'>{product.name}</td>
                    <td className='py-4 px-4'>${product.sellingPrice}</td>
                    <td className={`py-4 px-4`}>{product.category}</td>
                    <td className='py-2 px-4'>
                        <button className='btn btn-sm block  btn-primary my-auto mx-auto'>Proceed to Purchase</button>
                    </td>
                </tr>
            }</>
    );
};

export default WishlistRow;