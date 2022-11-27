import React, { useContext } from 'react';
import { MdLocationPin } from 'react-icons/md';
import { BsFillCalendarFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { useQuery } from '@tanstack/react-query';
import SmallSpinner from '../../components/SmallSpinner';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { FaPhoneAlt } from 'react-icons/fa';

const ProductCard = ({ product, setSelectedProduct }) => {
    const { user, } = useContext(AuthContext)
    const {
        _id,
        name,
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
        sellerEmail
    } = product
    const { data: seller, isLoading } = useQuery({
        queryKey: ['seller', sellerEmail],
        queryFn: () => axios.get(`https://phone-kinun-server-nazmulrony.vercel.app/seller?email=${sellerEmail}`)
            .then(data => {
                return data.data;
            })
    })
    const handleAddToWishlist = () => {
        const wishlist = {
            userEmail: user?.email,
            productId: _id
        }
        // console.log(wishlist);
        fetch('https://phone-kinun-server-nazmulrony.vercel.app/wishlist/add', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(wishlist)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success(' successfully added to wishlist')
                } else {
                    toast.error('You have already added this to wishlist');
                }
            })
    }
    if (isLoading) {
        return <SmallSpinner />
    }
    return (
        <div className="card card-side  bg-base-100 shadow-xl">
            <figure>
                <PhotoProvider>
                    <PhotoView src={image}>
                        <img src={image} alt="Movie" className='w-36' />
                    </PhotoView>
                </PhotoProvider>

            </figure>
            <div className="card-body">
                <div className='flex gap-2 items-center'>
                    <h2 className="card-title">{name}</h2>
                    <p ><small className='bg-primary w-6 px-1 text-light rounded-full' >{category}</small></p>
                </div>
                <div className='text-xs flex items-center'>
                    <p className='flex items-center gap-1'><BsFillCalendarFill />{postDate} </p>
                    <p className='flex items-center gap-1'><MdLocationPin />{location} </p>
                </div>
                <div className='flex justify-between'>
                    <p className='flex items-center gap-1 text-sm'><span className='font-semibold'>Seller Name:</span> {seller.name} {seller.isVerified ? <GoVerified className='text-primary text-xs' /> : ""}</p>
                </div>
                <p>Price: <span className='text-primary font-semibold text-lg'> ${sellingPrice}</span></p>
                <p>Original Price: <span className='text-primary font-semibold'> ${originalPrice}</span></p>

                <p>Condition : <span className='text-primary font-semibold'> {condition}</span></p>
                <p>Used: <span className='text-primary font-semibold'> {yearsOfUse} years</span></p>
                <p className='flex items-center text-sm gap-1'><FaPhoneAlt className='' />  ${phone}</p>
                <p className='text-sm'> <span className='font-semibold'>Description: </span>{description}</p>
                <div className="flex gap-2 flex-col  justify-between">
                    <label onClick={() => setSelectedProduct(product)} className='btn btn-primary rounded-none btn-sm' htmlFor="bookingModal">Order Now</label>
                    <button onClick={handleAddToWishlist} className='btn rounded-none btn-sm'>Add to Wishlist</button>
                </div>
            </div>
        </div>





    );
};

export default ProductCard;