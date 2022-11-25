import React from 'react';
import { FaPhoneAlt, FaSearchLocation } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { MdLocationOn } from 'react-icons/md';
import { BsFillCalendarCheckFill } from 'react-icons/bs';

const ProductCard = ({ product }) => {
    const { name,
        image,
        category,
        condition,
        originalPrice,
        sellingPrice,
        location,
        phone,
        postDate,
        description,
        yearsOfUse,
        sellerName,
        sellerVerified
    } = product
    return (
        <div className='bg-light max-w-md mx-auto p-6 shadow-lg shadow-black/10'>
            <div className=''>
                <img src={image} alt="" className='' />
            </div>
            <div className='px-2 flex flex-col gap-2 '>
                <div className='flex  justify-start items-center  gap-4 mt-4'>
                    <h3 className='text-2xl'>{name}</h3>
                    <p className='bg-primary px-2 text-white text-xs my-auto rounded-full'>{category}</p>
                </div>
                <div className='border border-primary rounded-lg bg-teal-50 p-2 -m-2'>
                    <div className='flex justify-between'>
                        <p><span className='font-semibold'>Selling Price:</span> ${sellingPrice}</p>
                        <p><span className='font-semibold'>Buying Price:</span> ${originalPrice}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p><span className='font-semibold'>Condition:</span> {condition}</p>
                        <p><span className='font-semibold'>Used:</span> ${yearsOfUse} years</p>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <p className='flex items-center gap-1'><span className='font-semibold'>Seller Name:</span> {sellerName} {sellerVerified ? <GoVerified className='text-primary text-sm' /> : ""}</p>
                </div>
                <p className='flex items-center gap-1'><FaPhoneAlt className='' />  ${phone}</p>
                <p className='flex items-center gap-1'><BsFillCalendarCheckFill />  {postDate}</p>
                <p className='flex items-center gap-1'><MdLocationOn className=' text-2xl' />  ${location}</p>
                <p><span className='font-semibold'>Description: </span>{description}</p>
                <div className='flex items-end justify-between h-full my-2'>

                    <button className='btn btn-primary rounded-none btn-sm'>Order Now</button>
                    <button className='btn rounded-none btn-sm'>Add to Wishlist</button>

                </div>

            </div>
        </div>
    );
};

export default ProductCard;