import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SmallSpinner from '../../components/SmallSpinner';
import { AuthContext } from '../../contexts/AuthProvider';


const AddProduct = () => {
    const { user, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imageHostKey;
    const handleAddProduct = data => {
        setLoading(true);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                const imgURL = imgData.data.url;
                const product = {
                    name: data.name,
                    category: data.category,
                    originalPrice: data.originalPrice,
                    sellingPrice: data.sellingPrice,
                    condition: data.condition,
                    image: imgURL,
                    location: data.location,
                    sellerEmail: user?.email,
                    phone: data.phone,
                    yearsOfUse: data.yearsOfUse,
                    description: data.description,
                    isSold: false
                }
                fetch('http://localhost:5000/products', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(product)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            toast.success('Product successfully added');
                            setLoading(false);
                            navigate('/dashboard/my-products');
                        }
                    })
            })
    }
    return (
        <div className='p-12'>
            <div className=' py-6 border w-full p-6 rounded-xl bg-light shadow-lg shadow-black/10'>
                <h3 className='text-xl text-ruby font-semibold text-center'>Add a Product</h3>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className="form-control w-full ">
                            <label className="label">Product Name</label>
                            <input
                                type="text"
                                {...register("name", {
                                    required: 'Name is required'
                                })}
                                placeholder="Enter Product Name"
                                className="input input-bordered w-full "
                            />
                            {errors.name && <p className='mt-1 text-sm text-red-600'>{errors.name?.message}</p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">Select Category</label>
                            <select className="select select-bordered w-full"
                                {...register("category", {
                                    required: 'Category is required'
                                })}>
                                <option value="samsung">Samsung</option>
                                <option value="apple">Apple</option>
                                <option value="oneplus">OnePlus</option>
                                <option value="xiaomi">Xiaomi</option>
                            </select>
                            {errors.category && <p className='mt-1 text-sm text-red-600'>{errors.category?.message}</p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">Original Price</label>
                            <input
                                type="text"
                                {...register("originalPrice", {
                                    required: 'Original Price is required'
                                })}
                                placeholder="Enter Original Price"
                                className="input input-bordered w-full "
                            />
                            {errors.originalPrice && <p className='mt-1 text-sm text-red-600'>{errors.originalPrice?.message}</p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">Selling Price</label>
                            <input
                                type="text"
                                {...register("sellingPrice", {
                                    required: 'Selling Price is required'
                                })}
                                placeholder="Enter Selling Price"
                                className="input input-bordered w-full "
                            />
                            {errors.sellingPrice && <p className='mt-1 text-sm text-red-600'>{errors.sellingPrice?.message}</p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">Select Condition</label>
                            <select className="select select-bordered w-full"
                                {...register("condition", {
                                    required: 'Condition is required'
                                })}>
                                <option value="excellent">Excellent</option>
                                <option value="good">Good</option>
                                <option value="fair">Fair</option>
                            </select>
                            {errors.condition && <p className='mt-1 text-sm text-red-600'>{errors.condition?.message}</p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">Upload Photo</label>
                            <input
                                {...register("image", {
                                    required: 'image is required'
                                })}
                                type="file"
                                className="file-input file-input-bordered w-full"
                            />
                            {errors.image && <p className='mt-1 text-sm text-red-600'>{errors.image?.message}</p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">Phone</label>
                            <input
                                type="text"
                                {...register("phone", {
                                    required: 'Phone is required'
                                })}
                                placeholder="Enter Your Phone Number"
                                className="input input-bordered w-full "
                            />
                            {errors.phone && <p className='mt-1 text-sm text-red-600'>{errors.phone?.message}</p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">Location</label>
                            <input
                                type="text"
                                {...register("location", {
                                    required: 'Location is required'
                                })}
                                placeholder="Enter Your Location"
                                className="input input-bordered w-full "
                            />
                            {errors.location && <p className='mt-1 text-sm text-red-600'>{errors.location?.message}</p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">Years of Use</label>
                            <input
                                type="text"
                                {...register("yearsOfUse", {
                                    required: 'Years of use is required'
                                })}
                                placeholder="Enter Selling Price"
                                className="input input-bordered w-full "
                            />
                            {errors.yearsOfUse && <p className='mt-1 text-sm text-red-600'>{errors.yearsOfUse?.message}</p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">Add Description</label>
                            <textarea
                                {...register("description", {
                                    required: 'Product description is required'
                                })}
                                className="textarea textarea-bordered"
                                placeholder="Describe Your Product">
                            </textarea>
                            {errors.description && <p className='mt-1 text-sm text-red-600'>{errors.description?.message}</p>}
                        </div>
                    </div>
                    <div className='my-6 flex'>

                        <button type="submit" className='btn btn-primary px'>{loading ? <SmallSpinner /> : 'Add Product'}</button>
                    </div>



                </form>
            </div>

        </div>
    );
};

export default AddProduct;