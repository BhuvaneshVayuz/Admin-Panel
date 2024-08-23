import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addStylingConfig } from '../../features/stylingConfigSlice';

const AddStylingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [url, setUrl] = useState('');
    const [bundles, setBundles] = useState([{ path: '', component: '', heading: '', logo: '' }]);

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleBundleChange = (index, e) => {
        const { name, value } = e.target;
        const newBundles = [...bundles];
        newBundles[index][name] = value;
        setBundles(newBundles);
    };

    const addBundle = () => {
        setBundles([...bundles, { path: '', component: '', heading: '', logo: '' }]);
    };

    const removeBundle = (index) => {
        const newBundles = bundles.filter((_, i) => i !== index);
        setBundles(newBundles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { url, bundles };
        console.log(formData, 'dust');
        let res = await dispatch(addStylingConfig(formData));
        console.log('add style data res', res);
        navigate('/styling-configs');
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Add New Styling Configuration
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        URL
                    </label>
                    <input
                        type="text"
                        name="url"
                        value={url}
                        onChange={handleUrlChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                </div>

                {bundles.map((bundle, index) => (
                    <div
                        key={index}
                        className="space-y-4 border p-4 rounded-md mb-4 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            Bundle {index + 1}
                        </h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Path
                            </label>
                            <input
                                type="text"
                                name="path"
                                value={bundle.path}
                                onChange={(e) => handleBundleChange(index, e)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Component
                            </label>
                            <input
                                type="text"
                                name="component"
                                value={bundle.component}
                                onChange={(e) => handleBundleChange(index, e)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Heading
                            </label>
                            <input
                                type="text"
                                name="heading"
                                value={bundle.heading}
                                onChange={(e) => handleBundleChange(index, e)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Logo
                            </label>
                            <input
                                type="text"
                                name="logo"
                                value={bundle.logo}
                                onChange={(e) => handleBundleChange(index, e)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeBundle(index)}
                            className="mt-2 text-red-500 hover:underline dark:text-red-400 dark:hover:text-red-300"
                        >
                            Remove Bundle
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addBundle}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500"
                >
                    Add Another Bundle
                </button>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                    Add Styling Configuration
                </button>
            </form>
        </div>
    );
};

export default AddStylingPage;
