"use client"
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { ChevronDown, Loader2, AlertCircle, Rocket, Zap, TrendingUp, Package } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";

const InventoryForecast = () => {
  const [forecastData, setForecastData] = useState([]);
  const [aiSummary, setAiSummary] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => { 
      try { 
        const response = await fetch("http://localhost:8080/api/ai/forecast");
        const data = await response.json();
        setForecastData(data.forecasts);
        setAiSummary(data?.aiSummary);
      } catch(error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchForecast();
  }, []);

  const getStatusColor = (days) => {
    if (days < 3) return "bg-red-500/15 text-red-600";
    if (days < 7) return "bg-amber-500/15 text-amber-600";
    return "bg-emerald-500/15 text-emerald-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          Inventory Forecast
        </h2>
      </div>

      <AnimatePresence>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <Table className="w-full">
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-[200px]">Product</TableHead>
                    <TableHead className="w-[120px]">Form</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Days Remaining</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {forecastData.map((item, index) => (
                    <TableRow 
                      key={index}
                      className="hover:bg-gray-50 transition-colors border-t"
                    >
                      <TableCell className="font-medium flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-500" />
                        {item.product}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-gray-600">
                          {item.form}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">{item.stock}</TableCell>
                      <TableCell>
  <div
    className={`${item.estimatedDaysLeft === null ? "bg-gray-200 text-gray-600" : getStatusColor(item.estimatedDaysLeft)} 
                px-3 py-1 rounded-full text-sm w-fit`}
  >
    {item.estimatedDaysLeft !== null ? `${item.estimatedDaysLeft} days` : "N/A"}
  </div>
</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {item.reorderRecommendation.includes("Reorder") ? (
                            <Zap className="w-4 h-4 text-amber-600" />
                          ) : (
                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                          )}
                          <span className="text-sm font-medium">
                            {item.reorderRecommendation}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 relative overflow-hidden"
            >
              <div className="absolute right-4 top-4 opacity-20">
                <Rocket className="w-16 h-16 text-blue-600" />
              </div>
              <div className="relative">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-blue-900">
                  <span className="p-2 bg-blue-100 rounded-lg">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </span>
                  AI Insights
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {/* {aiSummary || "No summary available"} */}
                  Based on the given data, here are the key inventory insights: 1. The product "Paracetamol" and "Antacid" with batch number "ES12345" have the lowest stock, both with an estimated 0 days left. Immediate reordering is suggested as stock is depleted. 2. The products "Sertraline" with batch number "BATCH-001" and "Antacid" with batch number "BATCH-005" have 5 and 6 estimated days of stock left respectively, and their reorder recommendation is to reorder soon. 3. All other products - "Lactose", "Ibuprofen", "Magnesium Stearate", "Starch", "Xanthan Gum", "Sertraline" with batch number "BATCH-002", "Clopidogrel", "Melatonin", and "Ascorbic Acid" - have sufficient stocks at the moment as their estimated days left are not highlighted as critical and their reorder recommendation is tagged as 'Sufficient Stock'. 4. According to batch numbers, "Clopidogrel" (Batch-012) and "Paracetamol" (Batch-011) are the latest batches. It might be prudent to observe their demand patterns, as they may be too new to have established trends. Please note that for a more detailed and accurate forecast, historical sales, lead time, seasonality, trends or any other external factors should be factored in beyond the current stock and estimated days left information.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default InventoryForecast;