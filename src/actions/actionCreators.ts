export const uploadStarted = () => ({
    type: 'UPLOAD_STARTED',
});

export const uploadSuccess = () => ({
    type: 'UPLOAD_SUCCESS',
});

export const uploadError = (error: string) => ({
    type: 'UPLOAD_ERROR',
    payload: error,
});
