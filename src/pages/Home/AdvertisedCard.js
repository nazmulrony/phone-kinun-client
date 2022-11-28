import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { } from 'react';
import SmallSpinner from '../../components/SmallSpinner';
import { BsFillCalendarFill } from 'react-icons/bs';
import { MdLocationPin } from 'react-icons/md';

const AdvertisedCard = ({ productId }) => {
    const { data: product = [], isLoading } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => axios.get(`https://phone-kinun-server-nazmulrony.vercel.app/products/${productId}`)
            .then(data => {
                return data.data
            })
    })
    const { name, image, sellingPrice, category, description, postDate, condition, location, yearsOfUse } = product
    if (isLoading) {
        return <SmallSpinner />
    }
    // console.log(product);
    return (
        <>
            {product && !product.isSold &&
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure className='w-56'><img src={image} alt="Movie" className='w-full' /></figure>
                    <div className="card-body">
                        <div className='flex gap-2 items-center'>
                            <h2 className="card-title">{name}</h2>
                            <p ><small className='bg-primary w-6 px-1 text-light rounded-full' >{category}</small></p>
                        </div>
                        <div className='text-xs flex items-center'>
                            <p className='flex items-center gap-1'><BsFillCalendarFill />{postDate} </p>
                            <p className='flex items-center gap-1'><MdLocationPin />{location} </p>
                        </div>
                        <p>Price: <span className='text-primary font-semibold'> ${sellingPrice}</span></p>
                        <p>Condition : <span className='text-primary font-semibold'> {condition}</span></p>
                        <p>Used: <span className='text-primary font-semibold'> {yearsOfUse}</span></p>
                        <p className='text-sm'> <span className='font-semibold'>Description: </span>{description}</p>
                        <div className="card-actions justify-end">

                        </div>
                    </div>
                </div>
            }

        </>
    );
};

export default AdvertisedCard;