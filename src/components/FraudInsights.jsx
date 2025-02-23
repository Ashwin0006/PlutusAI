/* eslint-disable react/prop-types */
import React from "react";
import CustomBarChart from "./BarChart"; // Import the BarChart component
import CustomPieChart from "./PieChart"; // Import the PieChart component
import Table from "./Table"; // Import the Table component
import "../styles/dashboard.css";  // Use "../" to go up one level from the components folder


// eslint-disable-next-line react/prop-types
const FraudInsights = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available. Please upload a CSV file.</p>;
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
    <div className="fraud-insights">
      <h2>Fraud Insights Dashboard</h2>

      {/* Bar Chart: Fraud Category Distribution */}
      <div className="chart-container">
        <h3>Fraud Category Distribution</h3>
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
      <div className="chart-container">
        <h3>Policy Status Distribution</h3>
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
      <div className="table-container">
        <h3>High-Risk Cases</h3>
        <Table data={data} columns={Object.keys(data[0])} />
      </div>
    </div>
  );
};

export default FraudInsights;