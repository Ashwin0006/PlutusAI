import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import FraudInsights from "../components/FraudInsights";
import "../styles/dashboard.css";
import "../styles/glow.css"; // Glow effects

console.log("Dashboard CSS imported successfully!");  // Add this line for debugging

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
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <FraudInsights data={csvData} />
    </div>
  );
};

export default AdminDashboard;