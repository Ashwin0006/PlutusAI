import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import FraudInsights from "../components/FraudInsights";
import "../styles/dashboard.css";
import "../styles/glow.css"; // Glow effects

const AdminDashboard = () => {
  const [csvData, setCsvData] = useState([]);

  const handleFileUpload = (csvData) => {
    const rows = csvData.split("\n");
    const headers = rows[0].split(",");
    const data = rows.slice(1).map((row) => {
      const values = row.split(",");
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {});
    });
    setCsvData(data);
  };

  return (
    <div className="admin-dashboard min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-gray-900 flex flex-col items-center p-10">
      <h1 className="text-4xl font-extrabold text-gray-800 glow-text text-center mb-6">
        Admin Dashboard
      </h1>

      {/* File Upload Component */}
      <div className="dashboard-section bg-white p-6 rounded-xl shadow-lg border border-purple-300 hover:shadow-purple-500 transition-all">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📂 Upload CSV File</h2>
        <FileUpload onFileUpload={handleFileUpload} />
      </div>

      {/* Fraud Insights Component */}
      <div className="dashboard-section bg-white p-6 rounded-xl shadow-lg border border-blue-300 hover:shadow-blue-500 transition-all mt-8 w-full">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">🔍 Fraud Analysis</h2>
        <FraudInsights data={csvData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
