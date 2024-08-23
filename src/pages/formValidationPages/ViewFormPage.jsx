import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFormValidationById, getSelectedFormValidationSelector } from '../../features/formValidationSlice';

const ViewFormPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const formValidationArr = getSelectedFormValidationSelector()
    let formValidation = null
    if (formValidationArr?.length > 0) {
        formValidation = formValidationArr[0]
    }

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            await dispatch(getFormValidationById(id))
            setLoading(false)
        }
        fetch()
    }, [id]);





    if (loading) {
        return <h1 className="text-center text-lg font-semibold">Loading...</h1>;
    }

    if (!formValidation) {
        return <h1 className="text-center text-lg font-semibold">No Form Validation Found</h1>;
    }

    return (
        <div className="py-10">
            <div className="p-6 max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800 rounded shadow-md dark:shadow-gray-700">
                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">View Form Validation</h1>
                <div className="space-y-6">
                    <div className="flex flex-col mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">ID</h2>
                        <p className="p-3 border border-gray-300 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">{formValidation.id}</p>
                    </div>

                    <div className="flex flex-col mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">URL</h2>
                        <p className="p-3 border border-gray-300 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">{formValidation.url}</p>
                    </div>

                    <div className="flex flex-col mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Name</h2>
                        <p className="p-3 border border-gray-300 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">{formValidation.name}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Configurations</h2>
                        {formValidation.configurations.length ? (
                            formValidation.configurations.map((config, index) => (
                                <div key={index} className="border border-gray-300 p-5 rounded bg-white dark:bg-gray-900 mb-4 shadow-sm dark:shadow-gray-700">
                                    <div className="flex flex-col mb-4">
                                        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Field Name</h3>
                                        <p className="p-2 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">{config.fieldName}</p>
                                    </div>

                                    <div className="flex flex-col mb-4">
                                        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Field Label</h3>
                                        <p className="p-2 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">{config.fieldLabel}</p>
                                    </div>

                                    <div className="flex flex-col mb-4">
                                        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Type</h3>
                                        <p className="p-2 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">{config.type}</p>
                                    </div>

                                    <div className="flex flex-col mb-4">
                                        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Regex</h3>
                                        <p className="p-2 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">{config.regex}</p>
                                    </div>

                                    <div className="flex flex-col mb-4">
                                        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Max Length</h3>
                                        <p className="p-2 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">{config.maxLength}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">No configurations available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewFormPage;
