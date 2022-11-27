import React from 'react'

const SmallSpinner = () => {
    return (
        <div className='flex justify-center items-center h-full'>
            <div className='w-6 h-6 border-x-2 border-dashed rounded-full animate-spin border-light'></div>
        </div>
    )
}

export default SmallSpinner
