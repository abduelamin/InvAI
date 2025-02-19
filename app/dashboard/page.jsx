"use client";
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [report, setReport] = useState(null);

  // Fetch raw report
  const handleReportGeneration = () => {
    const fetchReport = async () => {
      const response = await fetch("http://localhost:8080/api/ai/report");
      const data = await response.json();
      console.log("report data =", data);
    };
    fetchReport();
  };

  return (
    <div>
      <button onClick={handleReportGeneration}>Generate Report</button>
    </div>
  );
};

export default Dashboard;
