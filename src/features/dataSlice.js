import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { axiosRequest } from "../utils/userApiCalls";

const serverURL = `${import.meta.env.VITE_SERVER_URL}/data`;

export const getFormConfigs = createAsyncThunk('formConfigs/getFormConfigs', async (_, { rejectWithValue }) => {
    try {
        const url = `${serverURL}`;
        return await axiosRequest('GET', url);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getFormConfigByUrl = createAsyncThunk('formConfigs/getFormConfigByUrlAndName', async ({ url }, { rejectWithValue }) => {
    try {
        const endpoint = `${serverURL}/${url}`;
        return await axiosRequest('GET', endpoint);
    } catch (error) {
        return rejectWithValue(error);
    }
});
export const getFormConfigById = createAsyncThunk('formConfigs/getFormConfigById', async ({ id }, { rejectWithValue }) => {
    try {
        const endpoint = `${serverURL}/id/${id}`;
        return await axiosRequest('GET', endpoint);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const addFormConfig = createAsyncThunk('formConfigs/addFormConfig', async (formConfig, { rejectWithValue }) => {
    try {
        return await axiosRequest('POST', serverURL, formConfig);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const editFormConfig = createAsyncThunk('formConfigs/editFormConfig', async ({ id, formConfig }, { rejectWithValue }) => {
    try {
        const url = `${serverURL}/${id}`;
        return await axiosRequest('PUT', url, formConfig);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const deleteFormConfig = createAsyncThunk('formConfigs/deleteFormConfig', async (id, { rejectWithValue }) => {
    try {
        const url = `${serverURL}/${id}`;
        return await axiosRequest('DELETE', url);
    } catch (error) {
        return rejectWithValue(error);
    }
});

const formConfigSlice = createSlice({
    name: 'formConfigs',
    initialState: {
        formConfigs: [],
        status: 'idle',
        selectedFormConfig: null,
        error: null
    },
    extraReducers(builder) {
        builder
            .addCase(getFormConfigs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFormConfigs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.formConfigs = action.payload.data;
            })
            .addCase(getFormConfigs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.data;
            })
            .addCase(getFormConfigByUrl.fulfilled, (state, action) => {
                state.selectedFormConfig = action.payload.data;
            })
            .addCase(getFormConfigByUrl.rejected, (state, action) => {
                state.error = action.payload.data;
            })
            .addCase(getFormConfigById.fulfilled, (state, action) => {
                state.selectedFormConfig = action.payload.data;
            })
            .addCase(getFormConfigById.rejected, (state, action) => {
                state.error = action.payload.data;
            })
            .addCase(addFormConfig.fulfilled, (state, action) => {
                state.formConfigs.push(action.payload.data);
            })
            .addCase(addFormConfig.rejected, (state, action) => {
                state.error = action.payload.data;
            })
            .addCase(editFormConfig.fulfilled, (state, action) => {
                state.formConfigs = state.formConfigs.map(formConfig =>
                    formConfig.id === action.payload.data.id ? action.payload.data : formConfig
                );
            })
            .addCase(editFormConfig.rejected, (state, action) => {
                state.error = action.payload.data;
            })
            .addCase(deleteFormConfig.fulfilled, (state, action) => {
                state.formConfigs = state.formConfigs.filter(formConfig => formConfig.id !== action.payload.data.id);
            })
            .addCase(deleteFormConfig.rejected, (state, action) => {
                state.error = action.payload.data;
            });
    }
});

export const getFormConfigsSelector = () => useSelector(state => state.formConfigs.formConfigs);
export const getSelectedFormConfigSelector = () => useSelector(state => state.formConfigs.selectedFormConfig);
export const getFormConfigsStatus = () => useSelector(state => state.formConfigs.status);
export const getFormConfigsError = () => useSelector(state => state.formConfigs.error);

export default formConfigSlice.reducer;
