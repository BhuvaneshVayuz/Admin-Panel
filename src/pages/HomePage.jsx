import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'

export const HomePage = () => {
    return (
        <div className='flex flex-col gap-24 justify-center items-center h-screen'>
            <h1 className='text-8xl'>Welcome</h1>
            <div className='flex justify-center gap-10 items-center'>
                <Link className='text-3xl block px-6 py-4 bg-green-600 rounded-md text-white' to='/form-validations'>Validations</Link>
                <Link className='text-3xl block px-6 py-4 bg-green-600 rounded-md text-white' to='/styling-configs'>Styling</Link>
            </div>
        </div>
    )
}
