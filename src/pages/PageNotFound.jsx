import React from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center flex flex-col gap-2">
                <h1 className="text-4xl font-bold text-gray-800">404</h1>
                <p className="text-lg text-gray-600">Page Not Found</p>
                <button onClick={() => navigate('/')} className="px-5 py-2 bg-green-600 text-white rounded-lg">Home</button>
            </div>
        </div>
    );
}

export default PageNotFound;
