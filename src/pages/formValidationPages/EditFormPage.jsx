import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editFormValidation, getFormValidationById, getSelectedFormValidationSelector } from '../../features/formValidationSlice';

const EditFormPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        url: '',
        name: '',
        configurations: []
    });
    const [loading, setLoading] = useState(true);
    // const formValidation = useSelector(state => state.formValidations.selectedFormValidation);
    const formValidation = getSelectedFormValidationSelector()

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            await dispatch(getFormValidationById(id))
            setLoading(false)
        }
        fetch()

    }, [id]);

    useEffect(() => {
        console.log(formValidation, ' sic');
        if (formValidation?.length > 0) {
            let tempConfig = formValidation[0].configurations.map(obj => {
                let { _id, ...rest } = obj
                return rest
            })
            setFormData({
                url: formValidation[0].url || '',
                name: formValidation[0].name || '',
                configurations: tempConfig
            })
        }
    }, [formValidation])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleConfigChange = (index, e) => {
        const { name, value } = e.target;
        const updatedConfigs = [...formData.configurations];
        updatedConfigs[index] = {
            ...updatedConfigs[index],
            [name]: value
        };
        setFormData(prevState => ({
            ...prevState,
            configurations: updatedConfigs
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(editFormValidation({ id, formValidation: formData }))
        navigate('/form-validations')
    };


    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Edit Form Validation</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col mb-4">
                    <label htmlFor="url" className="text-lg font-medium mb-1">URL</label>
                    <input
                        type="text"
                        id="url"
                        name="url"
                        value={formData.url}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label htmlFor="name" className="text-lg font-medium mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                {formData.configurations.map((config, index) => (
                    <div key={index} className="border border-gray-300 p-4 rounded mb-4">
                        <h2 className="text-xl font-semibold mb-2">Configuration {index + 1}</h2>
                        <div className="flex flex-col mb-2">
                            <label htmlFor={`fieldName-${index}`} className="text-lg font-medium mb-1">Field Name</label>
                            <input
                                type="text"
                                id={`fieldName-${index}`}
                                name="fieldName"
                                value={config.fieldName}
                                onChange={(e) => handleConfigChange(index, e)}
                                className="p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div className="flex flex-col mb-2">
                            <label htmlFor={`fieldLabel-${index}`} className="text-lg font-medium mb-1">Field Label</label>
                            <input
                                type="text"
                                id={`fieldLabel-${index}`}
                                name="fieldLabel"
                                value={config.fieldLabel}
                                onChange={(e) => handleConfigChange(index, e)}
                                className="p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div className="flex flex-col mb-2">
                            <label htmlFor={`type-${index}`} className="text-lg font-medium mb-1">Type</label>
                            <select
                                id={`type-${index}`}
                                name="type"
                                value={config.type}
                                onChange={(e) => handleConfigChange(index, e)}
                                className="p-2 border border-gray-300 rounded"
                                required
                            >
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
                            <label htmlFor={`regex-${index}`} className="text-lg font-medium mb-1">Regex</label>
                            <input
                                type="text"
                                id={`regex-${index}`}
                                name="regex"
                                value={config.regex}
                                onChange={(e) => handleConfigChange(index, e)}
                                className="p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div className="flex flex-col mb-2">
                            <label htmlFor={`maxLength-${index}`} className="text-lg font-medium mb-1">Max Length</label>
                            <input
                                type="number"
                                id={`maxLength-${index}`}
                                name="maxLength"
                                value={config.maxLength}
                                onChange={(e) => handleConfigChange(index, e)}
                                className="p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                    </div>
                ))}

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditFormPage;
