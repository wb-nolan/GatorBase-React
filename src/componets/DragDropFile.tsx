import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../actions/fileActions';

const DragDropFile: React.FC = () => {
    const dispatch = useDispatch();

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
    
        if (files.length > 0) {
            const file = files[0];
            dispatch(uploadFile(file));
        }
    }, [dispatch]);

    const handleDragOver = (event: ReactDragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <div 
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
                border: '2px dashed #007bff',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                margin: '20px'
            }}
        >
            <p>Drag and Drop your Excel File here</p>
            <p>(or click to select a file</p>
        </div>
    );
};

export default DragDropFile;