"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Zap,
  BarChart3,
  Globe,
  Command,
  Activity,
} from "lucide-react";

export default function Home() {
  const transition = { duration: 1.2, ease: [0.22, 1, 0.36, 1] };

  return (
    <main className="bg-[#121210] text-[#FAF9F6] min-h-screen selection:bg-[#d4ff00] selection:text-black font-sans antialiased overflow-x-hidden">
      <section className="relative pt-64 pb-32 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
          >
            <h1 className="text-[11vw] lg:text-[8.5vw] font-bold leading-[0.85] tracking-tight uppercase">
              Healing<span className="text-[#d4ff00]">.</span>
              <br />
              <span className="text-white/20 italic font-light">
                Supply Chain.
              </span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-12 gap-8 mt-16 items-start">
            <motion.div
              className="col-span-12 lg:col-span-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.4, ...transition }}
            >
              <p className="text-xl md:text-2xl font-light leading-relaxed max-w-md text-stone-300">
                The gentle standard for AI pharmaceutical management. Designed
                for clinicians, optimised for Patient care.
              </p>
            </motion.div>

            <motion.div
              className="col-span-12 lg:col-span-7 flex flex-col items-start lg:items-end gap-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, ...transition }}
            >
              <div className="flex gap-4">
                <Link
                  href="/inventory"
                  className="h-16 px-10 bg-[#FAF9F6] text-black rounded-full flex items-center justify-center font-bold hover:bg-[#d4ff00] transition-all duration-500 hover:scale-105 shadow-xl"
                >
                  START THE PROTOCOL
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-8 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Efficiency Gain", val: "30%+", sub: "Predictive engine" },
            { label: "Uptime Sync", val: "24/7", sub: "Real-time sync" },
            { label: "Clinical Accuracy", val: "99.9%", sub: "AI confidence" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm group hover:border-[#d4ff00]/30 transition-all duration-500"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4ff00] mb-8 font-bold">
                {item.label}
              </p>
              <h3 className="text-6xl font-medium tracking-tighter mb-2">
                {item.val}
              </h3>
              <p className="text-sm opacity-40 uppercase tracking-widest font-medium">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 bg-[#1a1a18] rounded-[3rem] p-12 border border-white/5 relative overflow-hidden group shadow-2xl">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <Activity className="text-[#d4ff00] w-10 h-10 mb-6" />
                <h3 className="text-5xl font-bold tracking-tight mb-4">
                  Patient-First
                  <br />
                  Intelligence
                </h3>
                <p className="text-white/40 max-w-sm text-lg">
                  Automating the backend so you can focus on what matters: the
                  human element of medicine.
                </p>
              </div>
              <div className="flex gap-4 mt-12">
                <span className="px-6 py-2 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-widest border border-white/10">
                  Compliance Ready
                </span>
                <span className="px-6 py-2 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-widest border border-white/10">
                  HIPAA Secure
                </span>
              </div>
            </div>

            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-[#d4ff00]/5 rounded-full blur-3xl group-hover:bg-[#d4ff00]/10 transition-colors" />
          </div>

          <div className="col-span-12 lg:col-span-4 bg-[#d4ff00] rounded-[3rem] p-12 text-black flex flex-col justify-between hover:rotate-1 transition-transform">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Potential Savings
            </span>
            <div>
              <h4 className="text-6xl font-bold tracking-tighter mb-2">
                $12.4k
              </h4>
              <p className="font-medium opacity-70">
                Monthly waste reduction identified via AI Protocol!
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-40 pb-20 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div>
            <h2 className="text-4xl font-bold tracking-tighter mb-4 uppercase">
              Inv-AI Care<span className="text-[#d4ff00]">.</span>
            </h2>
            <p className="text-white/30 text-sm tracking-widest uppercase">
              © 2024 Inv-AI Systems
            </p>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/40"></div>
        </div>
      </footer>
    </main>
  );
}
