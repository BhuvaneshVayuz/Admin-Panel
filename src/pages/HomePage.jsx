import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
        <div className='flex flex-col gap-24 justify-center items-center h-screen bg-gray-100 dark:bg-gray-900'>
            <h1 className='text-8xl text-gray-900 dark:text-gray-100'>Welcome</h1>
            <div className='flex justify-center gap-10 items-center'>
                <Link
                    className='text-3xl block px-6 py-4 bg-green-600 rounded-md text-white hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-700'
                    to='/form-validations'
                >
                    Validations
                </Link>
                <Link
                    className='text-3xl block px-6 py-4 bg-green-600 rounded-md text-white hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-700'
                    to='/styling-configs'
                >
                    Styling
                </Link>
            </div>
        </div>
    );
};
