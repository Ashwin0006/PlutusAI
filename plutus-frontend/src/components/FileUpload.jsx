/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Upload } from "lucide-react";
import "../styles/dashboard.css";
import "../styles/glow.css";

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
    <div className="file-upload-container flex flex-col items-center p-6 bg-white shadow-lg rounded-xl border border-purple-300 transition-all hover:shadow-purple-400">
      <label
        htmlFor="fileInput"
        className="cyber-button flex items-center justify-center p-4 rounded-lg border border-purple-500 bg-gradient-to-r from-purple-400 to-blue-400 text-white text-lg font-bold cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
      >
        <Upload size={24} className="mr-2" />
        {file ? file.name : "Select a CSV File"}
      </label>
      <input
        type="file"
        accept=".csv"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className={`upload-btn mt-4 p-3 w-40 rounded-lg text-white font-semibold transition-all ${
          file
            ? "bg-purple-500 hover:bg-purple-600 hover:shadow-purple-400"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!file}
      >
        Upload CSV
      </button>
    </div>
  );
};

export default FileUpload;
