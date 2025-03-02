"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";

const AIForecast = () => {
  const [aiSummary, setAiSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateAI = async () => {
    setIsLoading(true);
    setAiSummary("");

    const eventSource = new EventSource(
      "https://inv-ai-backend.vercel.app/api/ai/forecast"
    );

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
      .replace(
        /ACTIONABLE RECOMMENDATIONS:/g,
        "\n\nACTIONABLE RECOMMENDATIONS:\n"
      )
      .split(/\n\s*\n/)
      .map((section, index) => {
        const match = section.match(/^([A-Z ]+):\s*(.*)$/s);
        if (!match)
          return (
            <p key={index} className="text-gray-800">
              {section}
            </p>
          );

        const [_, heading, content] = match;

        return (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-semibold text-blue-700">{heading}</h2>
            {content.split("- ").map((line, i) =>
              line.trim() ? (
                <p key={i} className="text-gray-800 leading-relaxed mb-2">
                  {line.trim()}
                </p>
              ) : null
            )}
          </div>
        );
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-lg p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-amber-800 flex items-center gap-3">
            <span className="p-3 bg-amber-100 rounded-xl shadow-sm">
              <Zap className="w-8 h-8 text-amber-600" />
            </span>
            Predictive Inventory Analysis
          </h1>
          <button
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
            onClick={handleGenerateAI}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">🌀</span>
                Generating...
              </span>
            ) : (
              "Generate Insights"
            )}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-inner p-6 border border-amber-100">
          {aiSummary ? (
            <div className="space-y-6 text-amber-900">
              {formatResponse(aiSummary)}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-amber-700 text-lg">
                {isLoading
                  ? "Analyzing inventory trends..."
                  : "Click above to generate AI-powered predictions"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIForecast;
