/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "../styles/dashboard.css";
import "../styles/glow.css"; // Glow effects

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        onFileUpload(csvData);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="file-upload cyber-button">
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
    </div>
  );
};

export default FileUpload;