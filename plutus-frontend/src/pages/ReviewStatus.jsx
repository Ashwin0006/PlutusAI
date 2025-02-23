import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DocumentVerification from '../components/DocumentVerification';

const ReviewStatus = () => {
  const { docId } = useParams();
  const [verificationResults, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerificationResults = async () => {
      try {
        // const response = await fetch(`http://127.0.0.1:5000/verify-document/${docId}`);
        // if (!response.ok) {
        //   throw new Error('Failed to fetch verification results');
        // }
        // const data = await response.json();
        // setResults(data);
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
    return <p className="text-center mt-8">Loading verification report...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-8">Error: {error}</p>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Document Verification Report</h2>
      {verificationResults && (
        <DocumentVerification results={verificationResults} />
      )}
    </div>
  );
};

export default ReviewStatus;