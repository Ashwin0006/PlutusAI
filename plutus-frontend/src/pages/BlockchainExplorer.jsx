import React, { useState, useEffect } from 'react';
import { Link, Hash, Database, Loader } from "lucide-react";
import "../styles/glow.css"; // Import cyberpunk glow effects

const BlockchainExplorer = () => {
  const [blockchain, setBlockchain] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlockchain = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get-blockchain');
        const data = await response.json();
        setBlockchain(data.chain);
      } catch (err) {
        console.error('Error fetching blockchain:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlockchain();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={50} className="text-blue-500 animate-spin" />
        <p className="ml-4 text-lg font-semibold text-blue-600">Loading Blockchain...</p>
      </div>
    );
  }

  return (
    <div className="blockchain-explorer min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-gray-900 flex flex-col items-center p-10">
      <h2 className="text-4xl font-extrabold glow-text text-center mb-6">
        🔗 Blockchain Explorer
      </h2>

      <div className="w-full max-w-5xl space-y-6">
        {blockchain.map((block, index) => (
          <div key={index} className="p-6 bg-white rounded-xl shadow-lg border border-purple-300 hover:shadow-purple-500 transition-all">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-blue-600">
              <Database size={24} /> Block #{block.index}
            </h3>
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <Hash size={16} className="text-gray-500" /> <span className="truncate">{block.hash}</span>
            </p>
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <Link size={16} className="text-gray-500" /> <span className="truncate">{block.previous_hash}</span>
            </p>
            <pre className="text-sm bg-gray-100 p-3 rounded-lg shadow-md mt-2 border border-gray-300 overflow-x-auto">
              {JSON.stringify(block.data, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockchainExplorer;
