import React from 'react'

const Spinner = () => {
    return (
        <div className='flex justify-center items-center  h-[70vh]'>
            <p className='text-5xl font-thin'>L</p>
            {/* <div className='w-10 h-10 border-4 border-dashed rounded-full animate-spin mt-5 border-green-400'></div> */}
            <div className="w-7 h-7 border-x-2 mt-3  border-green-600 border-dashed rounded-full animate-spin"></div>
            <p className='text-5xl font-thin'>ading....</p>
        </div>
    )
}

export default Spinner
