import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "../css/FileDrop.css";

const FileDrop: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [duplicateMessage, setDupicateMessage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setDupicateMessage(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("No Files to Upload");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const response = await fetch("http://35.95.239.56/api/gator/upload", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
        if (responseData.duplicates && responseData.duplicates.length > 0) {
          setDupicateMessage(
            `DUPLICATE BARCODES found: \n${responseData.duplicates.join(", ")}`
          );
        } else {
          setDupicateMessage("File uploaded sucessfully");
        }
        setFiles([]);
      } else {
        alert(`Failed to process files: ${responseData.message}`);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div {...getRootProps()} className="file-drop">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the Gator Excel File here...</p>
        ) : (
          <p>Drag & Drop an Gator Excel here, or click to select files</p>
        )}
      </div>

      <div className="file-list">
        <h3>File to upload to the Gator Database:</h3>
        {files.length > 0 ? (
          <ul>
            {files.map((file, index) => (
              <li key={index} className="file-item">
                {file.name} - {(file.size / 1024).toFixed(2)} KB
                <button
                  onClick={() => handleDelete(index)}
                  className="delete-button"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No file to add to the Database</p>
        )}
      </div>
      {duplicateMessage && (
        <div className="duplicate-message" style={{ whiteSpace: "pre-wrap" }}>
          {duplicateMessage}
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={isUploading}
        className="upload-button"
      >
        {isUploading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
};

export default FileDrop;
