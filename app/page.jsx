"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <main className="bg-gray-50">
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to Inv-AI
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Streamline your pharmaceutical inventory with AI-powered insights.
            </p>
            <Link
              href="/inventory"
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">
                  Real-Time Inventory Tracking
                </h2>
                <p className="mb-6 text-gray-700">
                  Monitor stock levels, manage orders, and optimize your supply
                  chain with up-to-date data.
                </p>
                <Link
                  href="/inventory"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Learn More &rarr;
                </Link>
              </div>
              <div className="md:w-1/2 mt-10 md:mt-0">
                <img
                  src="/images/inventory-tracking.jpg"
                  alt="Inventory Tracking"
                  className="w-full rounded shadow"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mt-10 md:mt-0">
                <img
                  src="/images/ai-weekly-report.jpg"
                  alt="AI Weekly Reports"
                  className="w-full rounded shadow"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">
                  AI-Powered Weekly Reports
                </h2>
                <p className="mb-6 text-gray-700">
                  Receive comprehensive insights and trend analysis every week,
                  helping you make informed decisions.
                </p>
                <Link
                  href="/weeklyreport"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Discover More &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Experience the Future of Pharma Inventory
            </h2>
            <p className="text-xl mb-8">
              Join Inv-AI today and revolutionize the way you manage your
              pharmaceutical supplies.
            </p>
            <Link
              href="/signup"
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
