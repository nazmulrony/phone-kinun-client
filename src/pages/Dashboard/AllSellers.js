import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../contexts/AuthProvider';
import ConfirmationModal from '../shared/ConfirmationModal';

const AllSellers = () => {
    const { logOut } = useContext(AuthContext);
    const [deletingSeller, setDeletingSeller] = useState(null)
    const { data: sellers, isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users?role=seller', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            if (res.status === 401 || res.status === 403) {
                logOut();
            }
            const data = res.json();
            return data;
        }

    })
    //delete byers 
    const handleDeleteBuyer = seller => {
        fetch(`http://localhost:5000/users/delete/${seller._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Seller successfully deleted')
                    refetch()
                }
            })
    }
    //handle Verify seller
    const handleVerifySeller = seller => (
        fetch(`http://localhost:5000/users/verify/${seller._id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    toast.success('User successfully verified.')
                    refetch();
                }
            })

    )



    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='px-4 lg:px-12 lg:py-6'>
            <h3 className='text-2xl text-primary text-center'>All Buyers</h3>
            {!sellers.length && <h4 className='text-warning text-2xl text-center'>You haven't  any sellers yet. </h4>}
            <div className='my-4 overflow-x-auto'>
                <table className='w-full shadow-lg shadow-black/10'>
                    <thead className='bg-primary text-light'>
                        <tr >
                            <th className='px-4 py-2'>S/N</th>
                            <th className='px-4 py-2'>Name</th>
                            <th className='px-4 py-2'>Email</th>
                            <th className='px-4 py-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody className=' divide-y divide-gray-300'>
                        {
                            sellers.length ? sellers.map((seller, i) =>
                                <tr
                                    className='text-center bg-slate-200 hover:bg-slate-300'
                                    key={seller._id}
                                >
                                    <td className='py-4 px-4'>{i + 1}</td>
                                    <td className='py-4 px-4'>{seller.name}</td>
                                    <td className='py-4 px-4'>{seller.email}</td>
                                    <td className='py-2 px-4 flex justify-center flex-col items-center gap-1'>
                                        <button onClick={() => handleVerifySeller(seller)} disabled={seller.isVerified} className='btn btn-xs w-20 btn-primary'>Verify</button>
                                        <label onClick={() => setDeletingSeller(seller)} htmlFor="confirmation-modal" className="btn btn-xs w-20 btn-error ">Delete</label>
                                    </td>
                                </tr>) : null
                        }
                    </tbody>


                </table>
            </div>
            {
                deletingSeller && <ConfirmationModal
                    title={'Are you sure you want to delete?'}
                    message={`If you delete seller named ${deletingSeller.name}, If you do so, you can not recover it!`}
                    modalData={deletingSeller}
                    successAction={handleDeleteBuyer}
                    successBtnName={'Confirm'}
                />
            }
        </div>
    );
};

export default AllSellers;