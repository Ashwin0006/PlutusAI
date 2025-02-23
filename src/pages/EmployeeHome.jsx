/* eslint-disable react/prop-types */
import { useParams, Link } from "react-router-dom"; // Import Link from react-router-dom
import { motion } from "framer-motion";
import { FileText, FolderOpen, UserCircle } from "lucide-react";
import "../styles/glow.css"; // Glow effects

const CyberButton = ({ icon, label, bg, shadow }) => {
    return (
        <motion.button 
            whileHover={{ scale: 1.1, boxShadow: `0px 0px 15px ${shadow}` }}
            whileTap={{ scale: 0.9 }}
            className={`cyber-button flex flex-col items-center p-5 ${bg} text-white rounded-xl transition-all duration-300`}
        >
            {icon}
            <span className="mt-2 font-medium">{label}</span>
        </motion.button>
    );
};

const dummySubmissions = [
    { title: "Insurance Claim - John Doe", date: "2025-02-18" },
    { title: "Loan Application - Jane Smith", date: "2025-02-17" },
    { title: "Policy Update - Michael Brown", date: "2025-02-16" },
    { title: "New Account Opening - Alice Johnson", date: "2025-02-15" },
];

export default function EmployeeHome() {
    const params = useParams();
    const employee = params.empId;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-gray-900 flex flex-col items-center p-10">
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                className="flex items-center gap-6 p-6 bg-white shadow-xl rounded-xl border border-purple-300 w-full max-w-3xl hover:shadow-purple-500 transition-all"
            >
                <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="p-3 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full"
                >
                    <UserCircle size={80} className="text-white" />
                </motion.div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 glow-text">Welcome, {employee}!</h1>
                    <p className="text-gray-500">Bank Verification Officer</p>
                </div>

                {/* Add the Admin Dashboard link here */}
                <Link 
                    to="/admin-dashboard" 
                    className="ml-auto bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
                >
                    Go to Admin Dashboard
                </Link>
            </motion.div>

            <div className="mt-8 flex space-x-8">
                <CyberButton 
                    icon={<FileText size={40} className="text-black " />} 
                    label="Review Documents" 
                    bg="bg-purple-500" 
                    shadow="shadow-purple-400" 
                />
                
                <CyberButton 
                    icon={<FolderOpen size={40} className="text-black" />} 
                    label="Recent Submissions" 
                    bg="bg-blue-500" 
                    shadow="shadow-blue-400" 
                />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                className="mt-8 w-full max-w-4xl bg-white p-6 shadow-lg rounded-xl border border-blue-300 hover:shadow-blue-500 transition-all"
            >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Submissions</h2>
                <div className="space-y-3">
                    {dummySubmissions.map((doc, index) => (
                        <motion.div 
                            key={index} 
                            whileHover={{ scale: 1.02 }}
                            className="flex justify-between p-3 bg-gray-50 rounded-lg shadow-md border-l-4 border-blue-400 transition-all cursor-pointer hover:bg-blue-100"
                        >
                            <span>{doc.title}</span>
                            <span className="text-sm text-gray-500">{doc.date}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

// /* eslint-disable react/prop-types */
// import { useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FileText, FolderOpen, UserCircle } from "lucide-react";
// import { useState } from "react"; // Import useState for handling CSV data
// import "../styles/glow.css"; // Glow effects

// const CyberButton = ({ icon, label, bg, shadow }) => {
//     return (
//         <motion.button 
//             whileHover={{ scale: 1.1, boxShadow: `0px 0px 15px ${shadow}` }}
//             whileTap={{ scale: 0.9 }}
//             className={`cyber-button flex flex-col items-center p-5 ${bg} text-white rounded-xl transition-all duration-300`}
//         >
//             {icon}
//             <span className="mt-2 font-medium">{label}</span>
//         </motion.button>
//     );
// };

// const dummySubmissions = [
//     { title: "Insurance Claim - John Doe", date: "2025-02-18" },
//     { title: "Loan Application - Jane Smith", date: "2025-02-17" },
//     { title: "Policy Update - Michael Brown", date: "2025-02-16" },
//     { title: "New Account Opening - Alice Johnson", date: "2025-02-15" },
// ];

// // Admin Dashboard Components
// const FileUpload = ({ onFileUpload }) => {
//     const [file, setFile] = useState(null);

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         setFile(selectedFile);
//     };

//     const handleUpload = () => {
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const csvData = e.target.result;
//                 onFileUpload(csvData);
//             };
//             reader.readAsText(file);
//         }
//     };

//     return (
//         <div className="file-upload">
//             <input type="file" accept=".csv" onChange={handleFileChange} />
//             <button 
//                 onClick={handleUpload} 
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
//             >
//                 Upload CSV
//             </button>
//         </div>
//     );
// };

// const FraudInsights = ({ data }) => {
//     if (!data || data.length === 0) {
//         return <p className="text-gray-500">No data available. Please upload a CSV file.</p>;
//     }

//     // Process data for visualizations
//     const fraudCategoryCounts = data.reduce((acc, row) => {
//         acc[row["Fraud Category"]] = (acc[row["Fraud Category"]] || 0) + 1;
//         return acc;
//     }, {});

//     const policyStatusCounts = data.reduce((acc, row) => {
//         acc[row["STATUS"]] = (acc[row["STATUS"]] || 0) + 1;
//         return acc;
//     }, {});

//     return (
//         <div className="fraud-insights">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Fraud Insights Dashboard</h2>

//             {/* Bar Chart: Fraud Category Distribution */}
//             <div className="chart-container mb-8">
//                 <h3 className="text-lg font-semibold text-gray-700 mb-2">Fraud Category Distribution</h3>
//                 <div className="bg-white p-4 rounded-lg shadow-md">
//                     <ul>
//                         {Object.entries(fraudCategoryCounts).map(([category, count], index) => (
//                             <li key={index} className="text-gray-600">
//                                 {category}: {count}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>

//             {/* Pie Chart: Policy Status Distribution */}
//             <div className="chart-container mb-8">
//                 <h3 className="text-lg font-semibold text-gray-700 mb-2">Policy Status Distribution</h3>
//                 <div className="bg-white p-4 rounded-lg shadow-md">
//                     <ul>
//                         {Object.entries(policyStatusCounts).map(([status, count], index) => (
//                             <li key={index} className="text-gray-600">
//                                 {status}: {count}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>

//             {/* Table: High-Risk Cases */}
//             <div className="table-container">
//                 <h3 className="text-lg font-semibold text-gray-700 mb-2">High-Risk Cases</h3>
//                 <div className="bg-white p-4 rounded-lg shadow-md">
//                     <table className="w-full">
//                         <thead>
//                             <tr>
//                                 {Object.keys(data[0]).map((key, index) => (
//                                     <th key={index} className="text-left p-2 bg-gray-100">{key}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {data.map((row, rowIndex) => (
//                                 <tr key={rowIndex}>
//                                     {Object.values(row).map((value, colIndex) => (
//                                         <td key={colIndex} className="p-2 border-b border-gray-200">{value}</td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default function EmployeeHome() {
//     const params = useParams();
//     const employee = params.empId;
//     const [csvData, setCsvData] = useState([]); // State to store CSV data

//     const handleFileUpload = (csvData) => {
//         const rows = csvData.split("\n");
//         const headers = rows[0].split(",");
//         const data = rows.slice(1).map((row) => {
//             const values = row.split(",");
//             return headers.reduce((obj, header, index) => {
//                 obj[header] = values[index];
//                 return obj;
//             }, {});
//         });
//         setCsvData(data);
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-gray-900 flex flex-col items-center p-10">
//             <motion.div 
//                 initial={{ opacity: 0, y: -20 }} 
//                 animate={{ opacity: 1, y: 0 }} 
//                 transition={{ duration: 0.6 }}
//                 className="flex items-center gap-6 p-6 bg-white shadow-xl rounded-xl border border-purple-300 w-full max-w-3xl hover:shadow-purple-500 transition-all"
//             >
//                 <motion.div 
//                     whileHover={{ scale: 1.1 }}
//                     className="p-3 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full"
//                 >
//                     <UserCircle size={80} className="text-white" />
//                 </motion.div>
//                 <div>
//                     <h1 className="text-3xl font-bold text-gray-800 glow-text">Welcome, {employee}!</h1>
//                     <p className="text-gray-500">Bank Verification Officer</p>
//                 </div>
//             </motion.div>

//             <div className="mt-8 flex space-x-8">
//                 <CyberButton 
//                     icon={<FileText size={40} className="text-black " />} 
//                     label="Review Documents" 
//                     bg="bg-purple-500" 
//                     shadow="shadow-purple-400" 
//                 />
                
//                 <CyberButton 
//                     icon={<FolderOpen size={40} className="text-black" />} 
//                     label="Recent Submissions" 
//                     bg="bg-blue-500" 
//                     shadow="shadow-blue-400" 
//                 />
//             </div>

//             <motion.div 
//                 initial={{ opacity: 0, y: 20 }} 
//                 animate={{ opacity: 1, y: 0 }} 
//                 transition={{ duration: 0.6 }}
//                 className="mt-8 w-full max-w-4xl bg-white p-6 shadow-lg rounded-xl border border-blue-300 hover:shadow-blue-500 transition-all"
//             >
//                 <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Submissions</h2>
//                 <div className="space-y-3">
//                     {dummySubmissions.map((doc, index) => (
//                         <motion.div 
//                             key={index} 
//                             whileHover={{ scale: 1.02 }}
//                             className="flex justify-between p-3 bg-gray-50 rounded-lg shadow-md border-l-4 border-blue-400 transition-all cursor-pointer hover:bg-blue-100"
//                         >
//                             <span>{doc.title}</span>
//                             <span className="text-sm text-gray-500">{doc.date}</span>
//                         </motion.div>
//                     ))}
//                 </div>
//             </motion.div>

//             {/* Admin Dashboard Section */}
//             <motion.div 
//                 initial={{ opacity: 0, y: 20 }} 
//                 animate={{ opacity: 1, y: 0 }} 
//                 transition={{ duration: 0.6 }}
//                 className="mt-8 w-full max-w-4xl bg-white p-6 shadow-lg rounded-xl border border-blue-300 hover:shadow-blue-500 transition-all"
//             >
//                 <h2 className="text-xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
//                 <FileUpload onFileUpload={handleFileUpload} />
//                 <FraudInsights data={csvData} />
//             </motion.div>
//         </div>
//     );
// }