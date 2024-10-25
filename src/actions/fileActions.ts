// fileActions.ts
import { AppDispatch } from '../store/store'; // Adjust the import based on your file structure
import axios from 'axios';
import { uploadStarted, uploadSuccess, uploadError } from '../store/fileReducer';

export const uploadFile = (file: File) => {
    return async (dispatch: AppDispatch):Promise<void> => {
        try {
            dispatch(uploadStarted());

            const formData = new FormData();
            formData.append('file', file);

            await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            dispatch(uploadSuccess());
        } catch (error) {
            dispatch(uploadError(error instanceof Error ? error.message : 'Unknown error'));
        }
    };
};
