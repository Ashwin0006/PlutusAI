/* eslint-disable react/prop-types */
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const CustomBarChart = ({ data, xKey, yKey }) => {
  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={yKey} fill="#8884d8" />
    </BarChart>
  );
};

export default CustomBarChart;