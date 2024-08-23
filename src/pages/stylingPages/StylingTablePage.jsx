import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStylingConfig, getStylingConfigs, getStylingConfigsSelector } from '../../features/stylingConfigSlice';

const StylingTablePage = () => {
    const dispatch = useDispatch();
    const stylingConfigs = getStylingConfigsSelector()

    const [loading, setLoading] = useState(true)

    console.log(stylingConfigs, 'styling configs');



    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            await dispatch(getStylingConfigs())
            setLoading(false)
        }
        fetch()
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this styling configuration?')) {
            dispatch(deleteStylingConfig(id));
        }
    };



    return (
        <>
            {loading ? <h1>loading...</h1> :
                <div className="p-4 max-w-6xl mx-auto">
                    <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Styling Configurations</h1>
                    <div className="mb-4">
                        <Link
                            to="/styling-configs/add"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            Add New Styling Config
                        </Link>
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {stylingConfigs.map((config) => (
                            <div
                                key={config.id}
                                className="border border-gray-300 p-4 rounded shadow-md bg-white dark:bg-gray-800 dark:border-gray-600"
                            >
                                <p className="mb-2 text-gray-900 dark:text-gray-100">
                                    <strong>URL:</strong> {config.url}
                                </p>
                                <div className="flex space-x-2">
                                    <Link
                                        to={`/styling-configs/view/${config.id}`}
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 dark:hover:bg-green-700"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        to={`/styling-configs/edit/${config.id}`}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 dark:hover:bg-yellow-700"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(config.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 dark:hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
};

export default StylingTablePage;
