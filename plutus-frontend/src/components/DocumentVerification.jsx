import React from 'react';

const DocumentVerification = ({ results }) => {
  return (
    <div className="verification-results p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Verification Report</h3>
      
      {/* Text Analysis */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Text Analysis</h4>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(results.text_analysis?.anomaly_score || 0) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Anomaly Detection Score: {results.text_analysis?.anomaly_score.toFixed(2)}
        </p>
      </div>

      {/* Image Analysis */}
      {results.image_analysis && (
        <div className="mb-6">
          <h4 className="font-medium mb-2">Image Forensic Analysis</h4>
          <div className="flex gap-4">
            <div className="w-1/2">
              <img src={`data:image/jpeg;base64,${results.image_analysis.original_image}`} alt="Original Document" />
            </div>
            <div className="w-1/2">
              <img src={`data:image/jpeg;base64,${results.image_analysis.ela_image}`} 
                   alt="Error Level Analysis" />
            </div>
          </div>
          <p className="text-sm text-red-600 mt-2">
            Tamper Confidence: {(results.image_analysis.tamper_score * 100).toFixed(1)}%
          </p>
        </div>
      )}

      {/* Metadata Analysis */}
      <div className="metadata-section">
        <h4 className="font-medium mb-2">Metadata Analysis</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm">Creation Date: {results.metadata_analysis.creation_date}</p>
            <p className="text-sm">Software Used: {results.metadata_analysis.software_used}</p>
          </div>
          <div>
            <p className={`text-sm ${results.metadata_analysis.hash_consistency.valid ? 'text-green-600' : 'text-red-600'}`}>
              Document Hash: {results.metadata_analysis.hash_consistency.hash.slice(0, 12)}...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerification;