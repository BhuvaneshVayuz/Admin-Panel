import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addFormValidation } from '../../features/formValidationSlice';

const AddFormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        url: '',
        name: '',
        configurations: [{ fieldName: '', fieldLabel: '', type: '', regex: '', maxLength: 0 }],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleConfigChange = (index, e) => {
        const { name, value } = e.target;
        const newConfigurations = [...formData.configurations];
        newConfigurations[index] = { ...newConfigurations[index], [name]: value };
        setFormData(prevState => ({
            ...prevState,
            configurations: newConfigurations
        }));
    };

    const addConfiguration = () => {
        setFormData(prevState => ({
            ...prevState,
            configurations: [...prevState.configurations, { fieldName: '', fieldLabel: '', type: '', regex: '', maxLength: 0 }],
        }));
    };

    const removeConfiguration = (index) => {
        const newConfigurations = formData.configurations.filter((_, i) => i !== index);
        setFormData(prevState => ({
            ...prevState,
            configurations: newConfigurations,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await dispatch(addFormValidation(formData));
        navigate('/form-validations');
    };
    return (
        <div className="py-5 bg-gray-100 dark:bg-gray-900">
            <div className="p-4 max-w-4xl mx-auto">
                <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Add New Form Validation</h1>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="flex flex-col mb-4">
                        <label htmlFor="url" className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">URL</label>
                        <input
                            type="text"
                            id="url"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            required
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="name" className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Configurations</h2>
                        {formData.configurations.map((config, index) => (
                            <div key={index} className="border border-gray-300 p-4 rounded mb-4 dark:border-gray-600 bg-white dark:bg-gray-800">
                                <div className="flex flex-col mb-2">
                                    <label htmlFor={`fieldName-${index}`} className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Field Name</label>
                                    <input
                                        type="text"
                                        id={`fieldName-${index}`}
                                        name="fieldName"
                                        value={config.fieldName}
                                        onChange={(e) => handleConfigChange(index, e)}
                                        className="p-2 border border-gray-300 rounded dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col mb-2">
                                    <label htmlFor={`fieldLabel-${index}`} className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Field Label</label>
                                    <input
                                        type="text"
                                        id={`fieldLabel-${index}`}
                                        name="fieldLabel"
                                        value={config.fieldLabel}
                                        onChange={(e) => handleConfigChange(index, e)}
                                        className="p-2 border border-gray-300 rounded dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col mb-2">
                                    <label htmlFor={`type-${index}`} className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Type</label>
                                    <select
                                        id={`type-${index}`}
                                        name="type"
                                        value={config.type}
                                        onChange={(e) => handleConfigChange(index, e)}
                                        className="p-2 border border-gray-300 rounded dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="text">Text</option>
                                        <option value="email">Email</option>
                                        <option value="password">Password</option>
                                        <option value="number">Number</option>
                                        <option value="date">Date</option>
                                        <option value="checkbox">Checkbox</option>
                                        <option value="radio">Radio</option>
                                        <option value="textarea">Textarea</option>
                                    </select>
                                </div>

                                <div className="flex flex-col mb-2">
                                    <label htmlFor={`regex-${index}`} className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Regex</label>
                                    <input
                                        type="text"
                                        id={`regex-${index}`}
                                        name="regex"
                                        value={config.regex}
                                        onChange={(e) => handleConfigChange(index, e)}
                                        className="p-2 border border-gray-300 rounded dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col mb-2">
                                    <label htmlFor={`maxLength-${index}`} className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Max Length</label>
                                    <input
                                        type="number"
                                        id={`maxLength-${index}`}
                                        name="maxLength"
                                        value={config.maxLength}
                                        onChange={(e) => handleConfigChange(index, e)}
                                        className="p-2 border border-gray-300 rounded dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                        required
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeConfiguration(index)}
                                    className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                                >
                                    Remove Configuration
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addConfiguration}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                        >
                            Add Configuration
                        </button>
                    </div>

                    <div className="mb-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            Add Form Validation
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddFormPage;
