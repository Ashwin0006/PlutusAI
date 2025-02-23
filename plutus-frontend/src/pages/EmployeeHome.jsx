/* eslint-disable react/prop-types */
import { useParams, Link } from "react-router-dom"; // Import Link from react-router-dom
import { motion } from "framer-motion";
import { FileText, FolderOpen, UserCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate(); 

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
                    icon={<FileText size={40} className="text-black" />} 
                    label="Review Documents" 
                    bg="bg-purple-500" 
                    shadow="shadow-purple-400"
                    onClick={() => navigate(`/review-status/${employee}`)} // Add this line
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
