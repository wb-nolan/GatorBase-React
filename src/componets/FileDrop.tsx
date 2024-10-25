import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../css/FileDrop.css';

const FileDrop: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    }, []);
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    
    const handleUpload = async () => {
        if (files.length === 0 ) {
            alert('No Files to Upload');
            return;
        }

        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", files[0]);

        try {
            const response = await fetch('http://35.95.239.56/api/gator/upload', {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert('Files uploaded successfully!');
                setFiles([]);
            } else {
                const errorResponse = await response.json();
                alert(`Failed to process files: ${errorResponse.message}`);
            }
        } catch (error) {
            console.error("Error uploading files:", error);
            alert("Error uploading files");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_,i)=> i !== index));
    };

    return (
        <div>
            <div {...getRootProps()} className="file=drop">
                <input {...getInputProps()}/>
                {isDragActive ? (
                    <p>Drop the files Here...</p>
                ) : (
                    <p>Drag & Drop some files here, or click to select files</p>
                )}
            </div>

            <div className='file=list'>
                <h3>Files Added:</h3>
                {files.length > 0 ? (
                    <ul>
                        {files.map((file, index) => (
                            <li key={index} className='file-item'>
                                {file.name} - {(file.size /1024).toFixed(2)} KB
                                <button onClick={() => handleDelete(index)} className="delete-button">
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p> No Files added yet.</p>
                )}
            </div>
            <button 
                onClick={handleUpload}
                disabled={isUploading}
                className='upload=button'
            >
                {isUploading ? "Uploading..." : "Upload Files"}
            </button>
        </div>
    );
};
export default FileDrop;