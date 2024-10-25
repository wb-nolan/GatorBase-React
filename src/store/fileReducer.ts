import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FileState {
    uploading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: FileState = {
    uploading: false,
    error: null,
    success: false,
};

const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        uploadStarted(state) {
            state.uploading = true;
            state.error = null;
            state.success = false;
        },
        uploadSuccess(state) {
            state.uploading = false;
            state.success = true;
        },
        uploadError(state, action:PayloadAction<string>) {
            state.uploading = false;
            state.error = action.payload;
        },
    },
});

export const { uploadStarted, uploadSuccess, uploadError} = fileSlice.actions;
export default fileSlice.reducer;