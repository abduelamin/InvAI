"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="bg-[#fafcff]">
        <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#f0f7ff] to-[#e6f3ff]">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-[#1a365d]">
                Pharmaceutical Inventory Management
                <span className="block mt-4 text-4xl md:text-5xl font-medium text-[#2a5c8a]">
                  Powered by Intelligent AI
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-[#4a6c8f] mb-12 max-w-3xl mx-auto">
                Optimize pharmaceutical supply chains with predictive analytics
                and real-time tracking
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/inventory"
                  className="inline-flex z-50 cursoer-pointer items-center justify-center bg-[#3a86ff] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#2f6fd1]"
                >
                  Explore Live Demo
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply animate-blob"></div>
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply animate-blob animation-delay-2000"></div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                {
                  metric: "30%+",
                  label: "Reduced Stockouts",
                  color: "#3a86ff",
                },
                {
                  metric: "24/7",
                  label: "Real-Time Tracking",
                  color: "#4cc9f0",
                },
                {
                  metric: "AI-Powered",
                  label: "Expiry Alerts",
                  color: "#7209b7",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-[#e2e8f0]"
                >
                  <div
                    className="text-4xl font-bold mb-2"
                    style={{ color: item.color }}
                  >
                    {item.metric}
                  </div>
                  <div className="text-lg text-[#4a5568]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#f8fafc]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
              <div className="lg:w-1/2">
                <div className="relative rounded-3xl overflow-hidden border-8 border-white">
                  <Image
                    src="/analytics-image.jpg"
                    alt="AI Dashboard Preview"
                    width={600}
                    height={200}
                  />
                </div>
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-bold text-[#1a365d] mb-6">
                  Intelligent Inventory Control
                </h2>
                <div className="space-y-6">
                  {[
                    "Automated expiration tracking",
                    "Batch-level insights",
                    "Compliance monitoring",
                    "Supplier analytics",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#ebf4ff] rounded-full flex items-center justify-center mt-1">
                        <svg
                          className="w-5 h-5 text-[#3a86ff]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-lg text-[#4a5568]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-[#1a365d] mb-8">
              Experience AI-Powered Insights
            </h2>

            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-[#e2e8f0]">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Interactive Preview Panel */}
                <div className="md:w-1/2 space-y-6 text-left">
                  <div className="p-4 bg-[#f8fafc] rounded-lg">
                    <h3 className="text-lg font-semibold text-[#1a365d] mb-2">
                      Sample Pharmacy Data
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#4cc9f0] rounded-full mr-2"></div>
                        <span className="text-[#4a5568]">
                          Current Inventory:
                        </span>
                        <span className="ml-auto font-medium">1,234 items</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#3a86ff] rounded-full mr-2"></div>
                        <span className="text-[#4a5568]">Expiring Soon:</span>
                        <span className="ml-auto font-medium">127 items</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#7209b7] rounded-full mr-2"></div>
                        <span className="text-[#4a5568]">
                          Replenishment Needs:
                        </span>
                        <span className="ml-auto font-medium">89 items</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#4a5568]">
                        AI Analysis Progress
                      </span>
                      <span className="text-[#3a86ff] font-medium">
                        87% Accuracy
                      </span>
                    </div>
                    <div className="h-2 bg-[#e2e8f0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#3a86ff] to-[#4cc9f0] rounded-full transition-all duration-1000"
                        style={{ width: "87%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Interactive AI Recommendations */}
                  <div className="p-4 bg-[#f8fafc] rounded-lg">
                    <h3 className="text-lg font-semibold text-[#1a365d] mb-3">
                      AI Recommendations
                    </h3>
                    <div className="space-y-3">
                      {[
                        "Order 50 units of Amoxicillin by July 20th",
                        "Discount expiring Paracetamol stock by 15%",
                      ].map((rec, index) => (
                        <div
                          key={index}
                          className="flex items-start p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="w-2 h-2 bg-[#3a86ff] rounded-full mt-2 mr-3"></div>
                          <span className="text-[#4a5568]">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual AI Analysis */}
                <div className="md:w-1/2">
                  <div className="p-6 bg-[#f8fafc] rounded-lg h-full">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="relative w-full max-w-xs mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#3a86ff] to-[#4cc9f0] opacity-10 rounded-xl"></div>

                        <div className="relative space-y-4">
                          <div className="p-4 bg-white rounded-lg shadow-md">
                            <div className="text-2xl font-bold text-[#1a365d]">
                              $12,450
                            </div>
                            <div className="text-sm text-[#4a5568]">
                              Potential Savings
                            </div>
                          </div>

                          <div className="p-4 bg-white rounded-lg shadow-md">
                            <div className="flex items-center justify-center space-x-4">
                              <div className="text-center">
                                <div className="text-xl font-bold text-[#1a365d]">
                                  23%
                                </div>
                                <div className="text-sm text-[#4a5568]">
                                  Waste Reduction
                                </div>
                              </div>
                              <div className="h-12 w-px bg-[#e2e8f0]"></div>
                              <div className="text-center">
                                <div className="text-xl font-bold text-[#1a365d]">
                                  15h
                                </div>
                                <div className="text-sm text-[#4a5568]">
                                  Weekly Time Saved
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/weeklyreport"
                className="mt-8 px-8 py-3 bg-[#3a86ff] text-white rounded-lg hover:bg-[#2f6fd1] transition-colors font-semibold shadow-md hover:shadow-lg"
              >
                Generate Full Report
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#486798] to-[#4cc9f0] text-white py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">
              Ready to Explore Further?
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto text-[#ebf4ff]">
              Discover full capabilities including predictive analytics and
              real-time dashboards
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/inventory"
                className="px-8 py-4 bg-white text-[#18458e] rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                View Interactive Demo
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
