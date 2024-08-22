// stylingConfigSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { axiosRequest } from "../utils/userApiCalls";

const serverURL = `${import.meta.env.VITE_SERVER_URL}/style`;

export const getStylingConfigs = createAsyncThunk('stylingConfigs/getStylingConfigs', async (_, { rejectWithValue }) => {
    try {
        const url = `${serverURL}`;
        return await axiosRequest('GET', url);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getStylingConfigById = createAsyncThunk('stylingConfigs/getStylingConfigById', async ({ id }, { rejectWithValue }) => {
    try {
        const url = `${serverURL}/id/${id}`;
        return await axiosRequest('GET', url);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const addStylingConfig = createAsyncThunk('stylingConfigs/addStylingConfig', async (stylingConfig, { rejectWithValue }) => {
    try {
        return await axiosRequest('POST', serverURL, stylingConfig);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const editStylingConfig = createAsyncThunk('stylingConfigs/editStylingConfig', async ({ id, stylingConfig }, { rejectWithValue }) => {
    try {
        const url = `${serverURL}/${id}`;
        return await axiosRequest('PUT', url, stylingConfig);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const deleteStylingConfig = createAsyncThunk('stylingConfigs/deleteStylingConfig', async (id, { rejectWithValue }) => {
    try {
        const url = `${serverURL}/${id}`;
        return await axiosRequest('DELETE', url);
    } catch (error) {
        return rejectWithValue(error);
    }
});

const stylingConfigSlice = createSlice({
    name: 'stylingConfigs',
    initialState: {
        stylingConfigs: [],
        status: 'idle',
        selectedStylingConfig: null,
        error: null
    },
    extraReducers(builder) {
        builder
            .addCase(getStylingConfigs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getStylingConfigs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.stylingConfigs = action.payload.data;
            })
            .addCase(getStylingConfigs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.data;
            })
            .addCase(getStylingConfigById.fulfilled, (state, action) => {
                state.selectedStylingConfig = action.payload.data;
            })
            .addCase(getStylingConfigById.rejected, (state, action) => {
                state.error = action.payload.data;
            })
            .addCase(addStylingConfig.fulfilled, (state, action) => {
                state.stylingConfigs.push(action.payload.data);
            })
            .addCase(addStylingConfig.rejected, (state, action) => {
                state.error = action.payload.data;
            })
            .addCase(editStylingConfig.fulfilled, (state, action) => {
                state.stylingConfigs = state.stylingConfigs.map(stylingConfig =>
                    stylingConfig.id === action.payload.data.id ? action.payload.data : stylingConfig
                );
            })
            .addCase(editStylingConfig.rejected, (state, action) => {
                state.error = action.payload.data;
            })
            .addCase(deleteStylingConfig.fulfilled, (state, action) => {
                state.stylingConfigs = state.stylingConfigs.filter(stylingConfig => stylingConfig.id != action.payload.data.id);
            })
            .addCase(deleteStylingConfig.rejected, (state, action) => {
                state.error = action.payload.data;
            });
    }
});

export const getStylingConfigsSelector = () => useSelector((state) => state.stylingConfigs.stylingConfigs)
export const getSelectedStylingConfigSelector = () => useSelector((state) => state.stylingConfigs.selectedStylingConfig)
export const getStylingConfigsStatus = () => useSelector((state) => state.stylingConfigs.status)

export default stylingConfigSlice.reducer;
