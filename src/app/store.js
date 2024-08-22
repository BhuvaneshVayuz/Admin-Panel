import { configureStore } from "@reduxjs/toolkit";
import formValidationReducer from "../features/formValidationSlice";
import stylingConfigsReducer from "../features/stylingConfigSlice";

const store = configureStore({
    reducer: {
        formValidations: formValidationReducer,
        stylingConfigs: stylingConfigsReducer
    },
});

export default store;
