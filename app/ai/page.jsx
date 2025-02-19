"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Zap } from "lucide-react";

const AIZone = () => {
  const [aiSummary, setAiSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateAI = async () => {
    setIsLoading(true);
    setAiSummary("");

    const eventSource = new EventSource("http://localhost:8080/api/ai/forecast");

    eventSource.onmessage = (event) => {
      if (event.data === "[DONE]") {
        setIsLoading(false);
        eventSource.close();
        return;
      }
      setAiSummary((prev) => prev + event.data);
    };

    eventSource.onerror = (err) => {
      console.error("EventSource error:", err);
      setIsLoading(false);
      eventSource.close();
    };
  };

  // formatting ai response so not one big block of text.
  const formatResponse = (text) => {
    if (!text) return "";

    return text
      .replace(/PREDICTIVE OUTLOOK:/g, "\n\nPREDICTIVE OUTLOOK:\n") 
      .replace(/ACTIONABLE RECOMMENDATIONS:/g, "\n\nACTIONABLE RECOMMENDATIONS:\n") 
      .split(/\n\s*\n/) 
      .map((section, index) => {
    
        const match = section.match(/^([A-Z ]+):\s*(.*)$/s);
        if (!match) return <p key={index} className="text-gray-800">{section}</p>;

        const [_, heading, content] = match;

        return (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-semibold text-blue-700">{heading}</h2>
            {content.split("- ").map((line, i) =>
              line.trim() ? <p key={i} className="text-gray-800 leading-relaxed mb-2">{line.trim()}</p> : null
            )}
          </div>
        );
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
          <span className="p-2 bg-blue-100 rounded-lg">
            <Zap className="w-8 h-8 text-blue-600" />
          </span>
          AI Inventory Insights
        </h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
          onClick={handleGenerateAI}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate AI Insight"}
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">AI Report</CardTitle>
        </CardHeader>
        <CardContent>
          {aiSummary ? (
            formatResponse(aiSummary)
          ) : (
            <p className="text-gray-800 text-lg leading-relaxed">
              {isLoading ? "Analysing data..." : "Please click the button to generate an AI report."}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIZone;