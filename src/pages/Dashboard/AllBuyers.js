import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import ConfirmationModal from '../shared/ConfirmationModal';

const AllBuyers = () => {
    const [deletingBuyer, setDeletingBuyer] = useState(null)
    const { data: buyers, isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: () => axios.get('http://localhost:5000/users?role=buyer')
            .then(data => {
                return data.data;
            })
    })
    //delete byers 
    const handleDeleteBuyer = buyer => {
        fetch(`http://localhost:5000/users/delete/${buyer._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Buyer successfully deleted')
                    refetch()
                }
            })
    }


    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='px-4 lg:px-12 lg:py-6'>
            <h3 className='text-2xl text-primary text-center'>All Buyers</h3>
            {!buyers.length && <h4 className='text-warning text-2xl text-center'>You haven't any buyers yet. </h4>}
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
                            buyers.map((buyer, i) =>
                                <tr
                                    className='text-center bg-slate-200 hover:bg-slate-300'
                                    key={buyer._id}
                                >
                                    <td className='py-4 px-4'>{i + 1}</td>
                                    <td className='py-4 px-4'>{buyer.name}</td>
                                    <td className='py-4 px-4'>{buyer.email}</td>
                                    <td className='py-2 px-4 flex justify-center flex-col items-center gap-1'>
                                        <label onClick={() => setDeletingBuyer(buyer)} htmlFor="confirmation-modal" className="btn btn-xs w-20 btn-error ">Delete</label>
                                    </td>
                                </tr>)
                        }
                    </tbody>


                </table>
            </div>
            {
                deletingBuyer && <ConfirmationModal
                    title={'Are you sure you want to delete?'}
                    message={`If you delete user named ${deletingBuyer.name}, If you do so, you can not recover it!`}
                    modalData={deletingBuyer}
                    successAction={handleDeleteBuyer}
                    successBtnName={'Confirm'}
                />
            }
        </div>
    );
};

export default AllBuyers;