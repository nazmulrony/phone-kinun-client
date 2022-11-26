import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const BookingModal = ({ selectedProduct, closeModal }) => {
    const { user, loading, setLoading } = useContext(AuthContext);
    const { name, sellingPrice, } = selectedProduct

    const handleSubmit = () => {
        setLoading(true);
        const order = {
            userEmail: user?.email,
            productId: selectedProduct._id,
            name: selectedProduct.name,
            meetLocation: form.target.location.value,
            phone: form.target.location.phone
        }

        return (
            <div>
                {/* The button to open modal */}


                {/* Put this part before </body> tag */}
                <input type="checkbox" id="bookingModal" className="modal-toggle" />
                <div className="modal">
                    <div className="bg-light relative w-full mx-4 md:w-2/3 p-12 shadow-lg shadow-black/20">
                        <label htmlFor="bookingModal" className="btn btn-sm btn-circle absolute btn-primary right-2 top-2">✕</label>
                        <h3 className="text-lg font-bold">Place Your Order for <span className='text-primary'>{name}</span></h3>
                        <form onSubmit={handleSubmit} className='grid gap-4 mt-4'>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='flex-1'>
                                    <label htmlFor="">Name</label>
                                    <input type="text" name="name" disabled defaultValue={user?.displayName} className="input input-bordered w-full" />
                                </div>
                                <div className='flex-1'>
                                    <label htmlFor="">Email</label>
                                    <input name='email' type="email" disabled defaultValue={user?.email} placeholder="Email" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='flex-1'>
                                    <label htmlFor="">Product Name</label>
                                    <input name='productName' type="text" disabled defaultValue={name} className="input input-bordered w-full" />
                                </div>
                                <div className='flex-1'>
                                    <label htmlFor="">Price</label>
                                    <input name='price' type="text" disabled defaultValue={sellingPrice} className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='flex-1'>
                                    <label htmlFor="">Phone Number</label>
                                    <input name='productName' type="text" placeholder="Enter your phone" className="input input-bordered w-full" />
                                </div>
                                <div className='flex-1'>
                                    <label htmlFor="">Meet Location</label>
                                    <input name='price' type="text" placeholder='Enter preferred meet location' className="input input-bordered w-full" />
                                </div>
                            </div>


                            <input onClick={closeModal} type="submit" placeholder="Type here" className="btn btn-primary rounded-none btn-sm" />
                        </form>
                    </div>
                    {/* <label htmlFor="bookingModal" className="btn">close modal</label> */}
                </div>
            </div>
        );
    };

    export default BookingModal;