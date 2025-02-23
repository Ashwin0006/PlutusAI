import { useNavigate, useParams } from "react-router-dom"; 
import { motion } from "framer-motion"; 
import { Upload, FileText, UserCircle } from "lucide-react"; 
import { useState } from "react";
import "../styles/glow.css";

function CustomerHome() {
    const params = useParams();
    const navigate = useNavigate();
    const user = params.userId;
    const [selectedFiles, setSelectedFiles] = useState([]);

    // Open file selection when "Upload Documents" is clicked
    function handleFileSelect() {
        document.getElementById("fileInput").click();
    }

    // Store selected files
    function handleFileChange(event) {
        setSelectedFiles(event.target.files);
    }

    // Upload Files to Backend
    async function handleUpload() {
        if (selectedFiles.length === 0) {
            alert("Please select at least one file.");
            return;
        }

        const formData = new FormData();
        for (let file of selectedFiles) {
            formData.append("files", file);
        }

        try {
            const res = await fetch(`http://127.0.0.1:5000/uploadDocuments/${user}`, {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            if (res.ok) {
                console.log("Upload Success:", data);
                alert("Files uploaded successfully!");
                setSelectedFiles([]);
            } else {
                console.error("Upload Failed:", data.message);
            }
        } catch (e) {
            console.error("Error:", e);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 text-gray-900">
            <header className="flex justify-between items-center p-6 shadow-md bg-gradient-to-br from-blue-600 to-purple-600">
                <h1 className="text-2xl font-bold tracking-widest text-pink-300">Plutus.AI</h1>
                <UserCircle size={36} className="text-emerald-300 cursor-pointer hover:text-purple-500 transition-all" onClick={() => navigate(`/userInfo/${user}`)} />
            </header>

            <div className="flex flex-col items-center justify-center mt-16">
                <h1 className="text-3xl font-extrabold text-gray-800 flex justify-center flex-col items-center">
                    Welcome, <span className="text-purple-600">{user}!</span>
                </h1>
                <p className="text-lg text-gray-600 mt-2">Manage your documents securely.</p>

                <div className="mt-8 flex space-x-6">
                    {/* Upload Documents Button */}
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="cyber-button flex flex-col items-center p-5 bg-white shadow-md border border-purple-300 rounded-xl hover:shadow-purple-400"
                        onClick={handleFileSelect}
                    >
                        <Upload size={40} className="text-purple-500" />
                        <span className="mt-2 font-medium text-gray-700">Upload Documents</span>
                    </motion.button>

                    {/* Review Status Button */}
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="cyber-button flex flex-col items-center p-5 bg-white shadow-md border border-blue-300 rounded-xl hover:shadow-blue-400"
                        onClick={() => navigate(`/review-status/${user}`)} // Update this line
                    >
                        <FileText size={40} className="text-blue-500" />
                        <span className="mt-2 font-medium text-gray-700">Review Status</span>
                    </motion.button>
                </div>

                {/* Hidden File Input */}
                <input 
                    type="file" 
                    multiple 
                    className="hidden" 
                    id="fileInput"
                    onChange={handleFileChange}
                />

                {/* Show Selected Files & Upload Button */}
                {selectedFiles.length > 0 && (
                    <div className="mt-6 p-4 bg-white shadow-md rounded-xl w-96">
                        <h2 className="text-lg font-bold text-gray-800">Selected Files:</h2>
                        <ul className="text-gray-600 text-sm mt-2">
                            {Array.from(selectedFiles).map((file, index) => (
                                <li key={index}>📄 {file.name}</li>
                            ))}
                        </ul>
                        <button 
                            className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-all"
                            onClick={handleUpload}
                        >
                            Upload Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomerHome;
