"use client";
import React, { useState, useEffect } from "react";

const WeeklyReport = () => {
  const [aiReport, setAiReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReportGeneration = async () => {
    setLoading(true);
    setAiReport("");
    setError("");
    try {
      const response = await fetch(
        "http://localhost:8080/api/ai/weekly-report"
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Report generation failed. Please try again later."
        );
      }
      const data = await response.json();
      setAiReport(data.summary);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-amber-800 mb-8">
          <span className="bg-amber-100 px-4 py-2 rounded-xl">
            Weekly Insights Report
          </span>
        </h2>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleReportGeneration}
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Report
          </button>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center mb-8 space-y-4">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-medium text-amber-700 animate-pulse">
              Analyzing this week's inventory patterns...
            </span>
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 mb-6 bg-red-50 p-4 rounded-xl">
            ⚠️ {error}
          </div>
        )}

        {aiReport && (
          <div className="bg-white p-6 rounded-xl shadow-inner border border-amber-100">
            <div className="prose prose-amber max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-amber-900">
                {aiReport}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyReport;

/* old layout 

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-100 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Executive Weekly Report
      </h2>
      <div className="flex justify-center mb-6">
        <button
          onClick={handleReportGeneration}
          disabled={loading}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Report
        </button>
      </div>
      {loading && (
        <div className="flex items-center justify-center mb-6">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-4 text-xl font-semibold text-blue-500 animate-pulse">
            Analysing data for this week - Please wait
          </span>
        </div>
      )}
      {error && <div className="text-center text-red-500 mb-6">{error}</div>}
      {aiReport && (
        <div className="bg-gray-200 p-6 rounded shadow-inner font-mono whitespace-pre-wrap text-gray-700 leading-relaxed">
          {aiReport}
        </div>
      )}
    </div>
  );
};*/
