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




    return (
        <>
            {loading ? <h1>Loading </h1> : <div className="p-4 max-w-4xl mx-auto">
                <h1 className="text-2xl font-semibold mb-4">View Form Validation</h1>
                <div className="space-y-4">
                    <div className="flex flex-col mb-4">
                        <h2 className="text-xl font-semibold mb-2">ID</h2>
                        <p className="p-2 border border-gray-300 rounded">{formValidation.id}</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <h2 className="text-xl font-semibold mb-2">URL</h2>
                        <p className="p-2 border border-gray-300 rounded">{formValidation.url}</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <h2 className="text-xl font-semibold mb-2">Name</h2>
                        <p className="p-2 border border-gray-300 rounded">{formValidation.name}</p>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Configurations</h2>
                        {formValidation.configurations.map((config, index) => (
                            <div key={index} className="border border-gray-300 p-4 rounded mb-4">
                                <div className="flex flex-col mb-2">
                                    <h3 className="text-lg font-medium mb-1">Field Name</h3>
                                    <p className="p-2 border border-gray-300 rounded">{config.fieldName}</p>
                                </div>

                                <div className="flex flex-col mb-2">
                                    <h3 className="text-lg font-medium mb-1">Field Label</h3>
                                    <p className="p-2 border border-gray-300 rounded">{config.fieldLabel}</p>
                                </div>

                                <div className="flex flex-col mb-2">
                                    <h3 className="text-lg font-medium mb-1">Type</h3>
                                    <p className="p-2 border border-gray-300 rounded">{config.type}</p>
                                </div>

                                <div className="flex flex-col mb-2">
                                    <h3 className="text-lg font-medium mb-1">Regex</h3>
                                    <p className="p-2 border border-gray-300 rounded">{config.regex}</p>
                                </div>

                                <div className="flex flex-col mb-2">
                                    <h3 className="text-lg font-medium mb-1">Max Length</h3>
                                    <p className="p-2 border border-gray-300 rounded">{config.maxLength}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>}
        </>
    );
};

export default ViewFormPage;
