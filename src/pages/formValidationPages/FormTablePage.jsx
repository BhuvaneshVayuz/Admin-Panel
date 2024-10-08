import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFormValidations, getFormValidationsSelector, deleteFormValidation } from '../../features/formValidationSlice';

const FormTablePage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const formValidations = getFormValidationsSelector();
    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            await dispatch(getFormValidations());
            setLoading(false);
        }
        fetch();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Do you want to delete?')) {
            dispatch(deleteFormValidation(id));
        }
    };

    let content = (
        <div className="overflow-x-auto">
            <div className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-900">
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Form Validations</h1>
                        <Link to="/form-validations/add">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                                Add New Form Validation
                            </button>
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <div className="min-w-full">
                            <div className="flex flex-col">
                                <div className="overflow-x-auto">
                                    <div className="align-middle inline-block min-w-full">
                                        <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
                                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                                <div className="flex flex-col">
                                                    <div className="py-2 px-4 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
                                                        <div className="flex-1 font-medium text-gray-900 dark:text-gray-100">Sr. No.</div>
                                                        <div className="flex-1 font-medium text-gray-900 dark:text-gray-100">URL</div>
                                                        <div className="flex-1 font-medium text-gray-900 dark:text-gray-100">Name</div>
                                                        <div className="flex-1 font-medium text-gray-900 dark:text-gray-100">Actions</div>
                                                    </div>
                                                    {formValidations?.map((form, index) => (
                                                        <div key={form.id} className="py-2 px-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                                                            <div className="flex-1 text-gray-800 dark:text-gray-300">{index + 1}</div>
                                                            <div className="flex-1 text-gray-800 dark:text-gray-300">{form.url}</div>
                                                            <div className="flex-1 text-gray-800 dark:text-gray-300">{form.name}</div>
                                                            <div className="flex-1 space-x-2">
                                                                <Link to={`/form-validations/view/${form.id}`}>
                                                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">View</button>
                                                                </Link>
                                                                <Link to={`/form-validations/edit/${form.id}`}>
                                                                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700">Edit</button>
                                                                </Link>
                                                                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700" onClick={() => handleDelete(form.id)}>Delete</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {loading ? <h1 className="text-center text-gray-900 dark:text-gray-100">Loading ...</h1> : <div className="p-4">
                {content}
            </div>}
        </>
    );
};

export default FormTablePage;
