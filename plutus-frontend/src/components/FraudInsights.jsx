/* eslint-disable react/prop-types */
import React from "react";
import CustomBarChart from "./BarChart";
import CustomPieChart from "./PieChart";
import Table from "./Table"; 
import "../styles/dashboard.css";  
import "../styles/glow.css";

const FraudInsights = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-lg text-gray-500 text-center mt-6">🚀 No data available. Please upload a CSV file.</p>;
  }

  // Process data for visualizations
  const fraudCategoryCounts = data.reduce((acc, row) => {
    acc[row["Fraud Category"]] = (acc[row["Fraud Category"]] || 0) + 1;
    return acc;
  }, {});

  const policyStatusCounts = data.reduce((acc, row) => {
    acc[row["STATUS"]] = (acc[row["STATUS"]] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="fraud-insights p-8 min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-gray-900">
      <h2 className="text-4xl font-extrabold text-gray-800 glow-text text-center mb-6">
        Fraud Insights Dashboard
      </h2>

      {/* Bar Chart: Fraud Category Distribution */}
      <div className="chart-container bg-white p-6 rounded-xl shadow-lg border border-purple-300 hover:shadow-purple-500 transition-all flex justify-center items-center flex-col">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">📊 Fraud Category Distribution</h3>
        <CustomBarChart
          data={Object.entries(fraudCategoryCounts).map(([category, count]) => ({
            category,
            count,
          }))}
          xKey="category"
          yKey="count"
        />
      </div>

      {/* Pie Chart: Policy Status Distribution */}
      <div className="chart-container bg-white p-6 rounded-xl shadow-lg border border-blue-300 hover:shadow-blue-500 transition-all mt-8 flex justify-center items-center flex-col">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">📈 Policy Status Distribution</h3>
        <CustomPieChart
          data={Object.entries(policyStatusCounts).map(([status, count]) => ({
            status,
            count,
          }))}
          labelKey="status"
          valueKey="count"
        />
      </div>

      {/* Table: High-Risk Cases */}
      <div className="table-container bg-white p-6 rounded-xl shadow-lg border border-amber-400 hover:shadow-amber-500 transition-all mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">⚠️ High-Risk Cases</h3>
        <Table data={data} columns={Object.keys(data[0])} />
      </div>
    </div>
  );
};

export default FraudInsights;
