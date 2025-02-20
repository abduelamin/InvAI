"use client";
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [aiReport, setAiReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReportGeneration = async () => {
    setLoading(true);
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
    <div
      style={{
        padding: "30px",
        maxWidth: "900px",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f4f8",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {" "}
      <h2
        style={{ textAlign: "center", color: "#2c3e50", marginBottom: "20px" }}
      >
        {" "}
        Executive Weekly Report{" "}
      </h2>{" "}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {" "}
        <button
          onClick={handleReportGeneration}
          style={{
            padding: "12px 24px",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#2980b9")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#3498db")
          }
        >
          {" "}
          Generate Report{" "}
        </button>{" "}
      </div>{" "}
      {loading && (
        <div
          style={{
            textAlign: "center",
            color: "#e67e22",
            marginBottom: "20px",
          }}
        >
          {" "}
          Loading report...{" "}
        </div>
      )}{" "}
      {error && (
        <div
          style={{ textAlign: "center", color: "red", marginBottom: "20px" }}
        >
          {" "}
          {error}{" "}
        </div>
      )}{" "}
      {aiReport && (
        <div
          style={{
            backgroundColor: "#ecf0f1",
            padding: "20px",
            borderRadius: "8px",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            color: "#2d3436",
            lineHeight: "1.6",
          }}
        >
          {" "}
          {aiReport}{" "}
        </div>
      )}{" "}
    </div>
  );
};
export default Dashboard;
