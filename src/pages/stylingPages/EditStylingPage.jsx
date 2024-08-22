import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editStylingConfig, getSelectedStylingConfigSelector, getStylingConfigById } from '../../features/stylingConfigSlice';

const EditStylingPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stylingConfigArr = getSelectedStylingConfigSelector();
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        url: '',
        bundles: [{ path: '', component: '', heading: '', logo: '' }]
    });

    useEffect(() => {
        const fetchStylingConfig = async () => {
            setLoading(true);
            await dispatch(getStylingConfigById({ id }));
            setLoading(false);
        };
        fetchStylingConfig();
    }, [id, dispatch]);

    useEffect(() => {
        if (stylingConfigArr?.length > 0) {
            const stylingConfig = stylingConfigArr[0];
            setFormData({
                url: stylingConfig.url || '',
                bundles: stylingConfig.bundles?.length > 0
                    ? stylingConfig.bundles
                    : [{ path: '', component: '', heading: '', logo: '' }]
            });
        }
    }, [stylingConfigArr]);

    const handleChange = (e, index, bundleField) => {
        const { value } = e.target;
        if (bundleField) {
            const updatedBundles = [...formData.bundles];
            updatedBundles[index] = { ...updatedBundles[index], [bundleField]: value };
            setFormData(prevState => ({ ...prevState, bundles: updatedBundles }));
        } else {
            setFormData(prevState => ({ ...prevState, [e.target.name]: value }));
        }
    };

    const handleAddBundle = () => {
        setFormData(prevState => ({
            ...prevState,
            bundles: [...prevState.bundles, { path: '', component: '', heading: '', logo: '' }]
        }));
    };

    const handleRemoveBundle = (index) => {
        setFormData(prevState => ({
            ...prevState,
            bundles: prevState.bundles.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(editStylingConfig({ id, stylingConfig: formData }));
        navigate('/styling-configs');
    };

    return (
        <>
            {loading ? <h1>Loading...</h1> : (
                <div className="p-4 max-w-3xl mx-auto">
                    <h1 className="text-2xl font-semibold mb-4">Edit Styling Configuration</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">URL</label>
                            <input
                                type="text"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        {formData.bundles.map((bundle, index) => (
                            <div key={index} className="space-y-2">
                                <h3 className="text-lg font-medium">Bundle {index + 1}</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Path</label>
                                    <input
                                        type="text"
                                        value={bundle.path}
                                        onChange={(e) => handleChange(e, index, 'path')}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Component</label>
                                    <input
                                        type="text"
                                        value={bundle.component}
                                        onChange={(e) => handleChange(e, index, 'component')}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Heading</label>
                                    <input
                                        type="text"
                                        value={bundle.heading}
                                        onChange={(e) => handleChange(e, index, 'heading')}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Logo</label>
                                    <input
                                        type="text"
                                        value={bundle.logo}
                                        onChange={(e) => handleChange(e, index, 'logo')}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveBundle(index)}
                                    className="mt-2 text-red-600 hover:text-red-800"
                                >
                                    Remove Bundle
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddBundle}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Add Bundle
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Update Styling Configuration
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default EditStylingPage;
