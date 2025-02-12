import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Inv-AI
        </Link>

        <div className="flex space-x-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Dashboard
          </Link>
          <Link
            href="/inventory"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Inventory
          </Link>
          <Link
            href="/ai"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            AI
          </Link>
        </div>
      </div>
    </nav>
  );
}
