import React, { useState, useEffect } from 'react';

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
    return <p className="text-center mt-8">Loading blockchain...</p>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Blockchain Explorer</h2>
      <div className="space-y-4">
        {blockchain.map((block, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Block #{block.index}</h3>
            <p className="text-sm text-gray-600">Hash: {block.hash}</p>
            <p className="text-sm text-gray-600">Previous Hash: {block.previous_hash}</p>
            <pre className="text-sm bg-gray-100 p-2 rounded mt-2">
              {JSON.stringify(block.data, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockchainExplorer;