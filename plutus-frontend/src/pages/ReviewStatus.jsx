import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DocumentVerification from '../components/DocumentVerification';
import "../styles/glow.css"; // Import cyberpunk glow effects

const ReviewStatus = () => {
  const { docId } = useParams();
  const [verificationResults, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerificationResults = async () => {
      try {
        // Simulating API call (Replace with actual API call)
        // const response = await fetch(`http://127.0.0.1:5000/verify-document/${docId}`);
        // if (!response.ok) {
        //   throw new Error('Failed to fetch verification results');
        // }
        // const data = await response.json();
        // setResults(data);

        // Placeholder Data for Now
        const placeholderResults = {
          text_analysis: {
            anomaly_score: 0.15,
            entities: ["Sundaresh Karthic", "2025-02-01"]
          },
          image_analysis: {
            tamper_score: 0.1,
            original_image: "base64_encoded_original_image_data",
            ela_image: "base64_encoded_ela_image_data"
          },
          metadata_analysis: {
            creation_date: "2025-02-01",
            software_used: "Microsoft Word",
            hash_consistency: {
              hash: "sha256:placeholder",
              valid: true
            }
          }
        };
        setResults(placeholderResults);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVerificationResults();
  }, [docId]);

  if (loading) {
    return <p className="text-center text-lg text-blue-500 mt-8 animate-pulse">🚀 Loading verification report...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-600 mt-8">⚠️ Error: {error}</p>;
  }

  return (
    <div className="review-status min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-gray-900 flex flex-col items-center p-10">
      <h2 className="text-4xl font-extrabold glow-text text-center mb-6">
        🔍 Document Verification Report
      </h2>

      {verificationResults && (
        <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg border border-purple-300 hover:shadow-purple-500 transition-all">
          <DocumentVerification results={verificationResults} />
        </div>
      )}
    </div>
  );
};

export default ReviewStatus;
