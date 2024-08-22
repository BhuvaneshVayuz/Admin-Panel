import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedStylingConfigSelector, getStylingConfigById } from '../../features/stylingConfigSlice';

const ViewStylingPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const stylingConfigArr = getSelectedStylingConfigSelector()
    const stylingConfig = stylingConfigArr?.length > 0 ? stylingConfigArr[0] : null;

    console.log(stylingConfig, 'kk');

    useEffect(() => {
        const fetchStylingConfig = async () => {
            setLoading(true);
            await dispatch(getStylingConfigById({ id }));
            setLoading(false);
        };
        fetchStylingConfig();
    }, [id]);

    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="p-4 max-w-3xl mx-auto">
                    <h1 className="text-2xl font-semibold mb-4">View Styling Configuration</h1>
                    <div className="border border-gray-300 p-4 rounded shadow-md">
                        <p><strong>URL:</strong> {stylingConfig?.url}</p>

                        <h2 className="text-lg font-medium mt-4">Bundles</h2>
                        {stylingConfig?.bundles?.length > 0 ? (
                            stylingConfig.bundles.map((bundle, index) => (
                                <div key={index} className="border border-gray-300 p-2 mt-2 rounded shadow-sm">
                                    <p><strong>Path:</strong> {bundle.path}</p>
                                    <p><strong>Component:</strong> {bundle.component}</p>
                                    <p><strong>Heading:</strong> {bundle.heading}</p>
                                    <p><strong>Logo:</strong> {bundle.logo}</p>
                                </div>
                            ))
                        ) : (
                            <p>No bundles available.</p>
                        )}
                        <h2 className="text-lg font-medium mt-4">Form Ids</h2>
                        {stylingConfig?.formIds?.length > 0 ? (
                            stylingConfig.formIds.map((formId, index) => (
                                <div key={index} className="border border-gray-300 p-2 mt-2 rounded shadow-sm">
                                    <p><strong>Name:</strong> {formId.name}</p>
                                    <p><strong>Id:</strong> {formId.id}</p>
                                </div>
                            ))
                        ) : (
                            <p>No form ids available.</p>
                        )}

                        <div className="mt-4">
                            <Link
                                to={`/styling-configs/edit/${stylingConfig?.id}`}
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                            >
                                Edit
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewStylingPage;
