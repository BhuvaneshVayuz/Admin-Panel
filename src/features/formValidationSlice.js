// formValidationSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { axiosRequest } from "../utils/userApiCalls";

const serverURL = `${import.meta.env.VITE_SERVER_URL}/validations`;

export const getFormValidations = createAsyncThunk('formValidations/getFormValidations', async (_, { rejectWithValue }) => {
    try {
        const url = `${serverURL}`;
        return await axiosRequest('GET', url);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getFormValidationById = createAsyncThunk('formValidations/getFormValidationById', async (id, { rejectWithValue }) => {
    try {
        const url = `${serverURL}/id/${id}`;
        return await axiosRequest('GET', url);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getFormValidationByUrlAndName = createAsyncThunk('formValidations/getFormValidationByUrlAndName', async ({ url, name }, { rejectWithValue }) => {
    try {
        const endpoint = `${serverURL}/${url}/${name}`;
        return await axiosRequest('GET', endpoint);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const addFormValidation = createAsyncThunk('formValidations/addFormValidation', async (formValidation, { rejectWithValue }) => {
    try {
        return await axiosRequest('POST', serverURL, formValidation);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const editFormValidation = createAsyncThunk('formValidations/editFormValidation', async ({ id, formValidation }, { rejectWithValue }) => {
    try {
        const url = `${serverURL}/${id}`;
        return await axiosRequest('PUT', url, formValidation);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const deleteFormValidation = createAsyncThunk('formValidations/deleteFormValidation', async (id, { rejectWithValue }) => {
    try {
        const url = `${serverURL}/${id}`;
        return await axiosRequest('DELETE', url);
    } catch (error) {
        return rejectWithValue(error);
    }
});

const formValidationSlice = createSlice({
    name: 'formValidations',
    initialState: {
        formValidations: [],
        status: 'idle',
        selectedFormValidation: null,
        error: null
    },
    extraReducers(builder) {
        builder
            .addCase(getFormValidations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFormValidations.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.formValidations = action.payload.data;
            })
            .addCase(getFormValidations.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.data;
            })
            .addCase(getFormValidationById.fulfilled, (state, action) => {
                state.selectedFormValidation = action.payload.data;
            })
            .addCase(getFormValidationById.rejected, (state, action) => {
                state.error = action.payload.data;
            })
            .addCase(getFormValidationByUrlAndName.fulfilled, (state, action) => {
                state.selectedFormValidation = action.payload.data;
            })
            .addCase(getFormValidationByUrlAndName.rejected, (state, action) => {
                state.error = action.payload.data;
            })
            .addCase(addFormValidation.fulfilled, (state, action) => {
                state.formValidations.push(action.payload.data);
            })
            .addCase(addFormValidation.rejected, (state, action) => {
                state.error = action.payload.data;
            })
            .addCase(editFormValidation.fulfilled, (state, action) => {
                state.formValidations = state.formValidations.map(formValidation =>
                    formValidation.id === action.payload.data.id ? action.payload.data : formValidation
                );
            })
            .addCase(editFormValidation.rejected, (state, action) => {
                state.error = action.payload.data;
            })
            .addCase(deleteFormValidation.fulfilled, (state, action) => {
                state.formValidations = state.formValidations.filter(formValidation => formValidation.id !== action.payload.data.id);
            })
            .addCase(deleteFormValidation.rejected, (state, action) => {
                state.error = action.payload.data;
            });
    }
});

export const getFormValidationsSelector = () => useSelector((state) => state.formValidations.formValidations);
export const getSelectedFormValidationSelector = () => useSelector((state) => state.formValidations.selectedFormValidation);
export const getFormValidationsStatus = () => useSelector((state) => state.formValidations.status);
export const getFormValidationsError = () => useSelector((state) => state.formValidations.error);

export default formValidationSlice.reducer;
