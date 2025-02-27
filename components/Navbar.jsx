"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navLinks = [
    { name: "Inventory", href: "/inventory" },
    { name: "AI Forecast", href: "/aiforecast" },
    { name: "Weekly Reports", href: "/weeklyreport" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-amber-50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-amber-700 flex items-center gap-2"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Inv.AI
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-amber-100 text-amber-700"
                    : "text-slate-600 hover:bg-amber-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* <Link
              href="/login"
              className="px-6 py-2 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors"
            >
              Sign In
            </Link> */}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-600 hover:text-amber-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-4 py-3 rounded-lg ${
                  pathname === link.href
                    ? "bg-amber-100 text-amber-700"
                    : "text-slate-600 hover:bg-amber-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-amber-50">
              {/* <Link
                href="/login"
                className="block px-4 py-3 text-slate-600 hover:bg-amber-50"
              >
                Sign In
              </Link> */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
