"use client";

import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex w-full px-4 py-8 justify-between items-center sticky top-0 z-40 backdrop-blur-md bg-transparent"
    >
      <div className="flex items-center gap-3">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative p-2 bg-slate-900 rounded-full border border-white/10">
            <ShieldCheck className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xl font-black text-white tracking-tight">
            PULSE<span className="text-blue-500">LOCK</span>
          </h1>
          <p className="text-[10px] text-blue-100/40 uppercase tracking-[0.2em] font-bold">
            Secure Strength Analytics
          </p>
        </div>
      </div>
      <div className="flex items-center bg-white/5 backdrop-blur-sm p-1.5 rounded-2xl border border-white/10">
        <ConnectButton showBalance={false} />
      </div>
    </motion.nav>
  );
}

