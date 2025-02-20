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
      const data = await response.json();
      setAiReport(data.summary);
    } catch (err) {
      console.error(err);
      setError("Report generation failed. Please try again later.");
    }
    setLoading(false);
  };

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
};

export default WeeklyReport;
