import React from "react";
import { ImageOff } from "lucide-react";
import "../styles/glow.css"; // Import glow effects

const DocumentVerification = ({ results }) => {
  return (
    <div className="verification-results p-8 bg-white rounded-xl">
      <h3 className="text-3xl font-bold glow-text text-center mb-6">
        🔍 Verification Report
      </h3>

      {/* Text Analysis */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-md border border-blue-400 hover:shadow-blue-500 transition-all">
        <h4 className="text-lg font-semibold mb-2 text-blue-600">
          📜 Text Analysis
        </h4>
        <div className="w-full bg-gray-300 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{
              width: `${(results.text_analysis?.anomaly_score || 0) * 100}%`,
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-700 mt-2">
          Anomaly Detection Score:{" "}
          <span className="text-purple-600 font-semibold">
            {results.text_analysis?.anomaly_score.toFixed(2)}
          </span>
        </p>
      </div>

      {/* Image Analysis */}
      {results.image_analysis && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-md border border-red-400 hover:shadow-red-500 transition-all">
          <h4 className="text-lg font-semibold text-red-600 mb-2">
            🖼️ Image Forensic Analysis
          </h4>
          <div className="flex gap-4">
            <div className="w-1/2 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-all">
              {results.image_analysis.original_image ? (
                <img
                  src={`data:image/jpeg;base64,${results.image_analysis.original_image}`}
                  alt="Original Document"
                  className="w-full"
                />
              ) : (
                <ImageOff size={50} className="text-gray-400" />
              )}
            </div>
            <div className="w-1/2 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-all">
              {results.image_analysis.ela_image ? (
                <img
                  src={`data:image/jpeg;base64,${results.image_analysis.ela_image}`}
                  alt="Error Level Analysis"
                  className="w-full"
                />
              ) : (
                <ImageOff size={50} className="text-gray-400" />
              )}
            </div>
          </div>
          <p className="text-sm text-red-600 mt-2 font-semibold">
            Tamper Confidence:{" "}
            <span className="text-xl">
              {(results.image_analysis.tamper_score * 100).toFixed(1)}%
            </span>
          </p>
        </div>
      )}

      {/* Metadata Analysis */}
      <div className="p-4 bg-gray-50 rounded-lg shadow-md border border-amber-400 hover:shadow-amber-500 transition-all">
        <h4 className="text-lg font-semibold text-amber-600 mb-2">
          📑 Metadata Analysis
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p>
              🕒 Creation Date:{" "}
              <span className="text-purple-700 font-semibold">
                {results.metadata_analysis.creation_date}
              </span>
            </p>
            <p>
              🖥️ Software Used:{" "}
              <span className="text-purple-700 font-semibold">
                {results.metadata_analysis.software_used}
              </span>
            </p>
          </div>
          <div>
            <p
              className={`font-semibold ${
                results.metadata_analysis.hash_consistency.valid
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              🔗 Document Hash:{" "}
              {results.metadata_analysis.hash_consistency.hash.slice(0, 12)}...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerification;
