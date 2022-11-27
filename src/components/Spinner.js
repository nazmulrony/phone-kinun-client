import React from 'react'

const Spinner = () => {
    return (
        <div className='flex justify-center items-center  h-[70vh]'>
            <p className='text-5xl font-thin'>L</p>
            <div className="w-7 h-7 border-x-2 mt-3  border-primary border-dashed rounded-full animate-spin"></div>
            <p className='text-5xl font-thin'>ading...</p>
        </div>
    )
}

export default Spinner
