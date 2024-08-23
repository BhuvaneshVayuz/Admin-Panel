import React from 'react';
import { Route } from 'react-router-dom';
import AddFormPage from '../pages/formValidationPages/AddFormPage';
import EditFormPage from '../pages/formValidationPages/EditFormPage';
import FormTablePage from '../pages/formValidationPages/FormTablePage';
import ViewFormPage from '../pages/formValidationPages/ViewFormPage';
import { HomePage } from '../pages/HomePage';
import Navbar from '../pages/Navbar';
import PageNotFound from '../pages/PageNotFound';
import AddStylingPage from '../pages/stylingPages/AddStylingPage';
import EditStylingPage from '../pages/stylingPages/EditStylingPage';
import StylingTablePage from '../pages/stylingPages/StylingTablePage';
import ViewStylingPage from '../pages/stylingPages/ViewStylingPage';
import Wrapper from '../pages/Wrapper';

const RoutesAll = [
    <>
        <Route path='/' element={<Navbar />}>
            <Route index element={<HomePage />} />

            <Route path='/form-validations' element={<Wrapper />}>
                <Route index element={<FormTablePage />} />
                <Route path='add' element={<AddFormPage />} />
                <Route path='view/:id' element={<ViewFormPage />} />
                <Route path='edit/:id' element={<EditFormPage />} />
            </Route>

            <Route path='/styling-configs' element={<Wrapper />}>
                <Route index element={<StylingTablePage />} />
                <Route path='add' element={<AddStylingPage />} />
                <Route path='view/:id' element={<ViewStylingPage />} />
                <Route path='edit/:id' element={<EditStylingPage />} />
            </Route>

            <Route path='*' element={<PageNotFound />} />
        </Route>
    </>
];

export default RoutesAll;
