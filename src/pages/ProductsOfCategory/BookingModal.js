import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const BookingModal = ({ selectedProduct, closeModal }) => {
    const { user, loading, setLoading } = useContext(AuthContext);
    const { name, sellingPrice, } = selectedProduct

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const order = {
            productId: selectedProduct._id,
            userEmail: user?.email,
            name: selectedProduct.name,
            location: event.target.location.value,
            phone: event.target.phone.value,
        }
        fetch('http://localhost:5000/products/add', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success('Order successfully placed')
                    setLoading(false);
                    closeModal();
                } else {
                    toast.error('You have already placed this order')
                    setLoading(false);
                    closeModal();
                }

            })
        console.log(order);
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
                                <input name='phone' type="text" placeholder="Enter your phone" className="input input-bordered w-full" required />
                            </div>
                            <div className='flex-1'>
                                <label htmlFor="">Meet Location</label>
                                <input name='location' type="text" placeholder='Enter preferred meet location' className="input input-bordered w-full" required />
                            </div>
                        </div>



                        <button type="submit" className="btn btn-primary rounded-none btn-sm">Place Order</button>

                    </form>
                </div>
                {/* <label htmlFor="bookingModal" className="btn">close modal</label> */}
            </div>
        </div>
    );
};

export default BookingModal;