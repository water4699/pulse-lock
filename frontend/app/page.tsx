"use client";

import { StrengthTrackerDemo } from "@/components/StrengthTrackerDemo";
import { motion } from "framer-motion";
import { Shield, Lock, Activity, TrendingUp, Dumbbell, Zap } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Decorative Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-4">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Powered by Zama FHEVM</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
            Pulse <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Lock</span> Progress
          </h1>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            The world's first fully encrypted strength training tracker. 
            Your gains are your business. We keep them that way.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-white text-sm">End-to-End Encryption</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Lock className="w-5 h-5 text-purple-400" />
              <span className="text-white text-sm">On-chain Privacy</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-white text-sm">Verifiable Progress</span>
            </div>
          </div>
        </motion.section>

        {/* Main Application Area with staggered entry */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <StrengthTrackerDemo />
          </motion.div>
        </motion.div>

        {/* Decorative Feature Cards Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl space-y-4 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Encrypted Storage</h3>
            <p className="text-blue-100/60 leading-relaxed">
              Every rep, set, and max weight is homomorphically encrypted before it ever leaves your browser.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl space-y-4 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Private Analysis</h3>
            <p className="text-blue-100/60 leading-relaxed">
              Track your volume and progress without exposing your personal fitness data to public explorers.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl space-y-4 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Dumbbell className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Proof of Gainz</h3>
            <p className="text-blue-100/60 leading-relaxed">
              Securely prove your strength milestones while maintaining absolute data sovereignty on-chain.
            </p>
          </motion.div>
        </motion.section>

        {/* Decorative Stats Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-12 border border-white/10 text-center space-y-8"
        >
          <h2 className="text-3xl font-bold text-white">Global Network Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-white">100%</p>
              <p className="text-sm text-blue-200/60 uppercase tracking-widest">Encrypted</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-white">0.2s</p>
              <p className="text-sm text-blue-200/60 uppercase tracking-widest">Avg Encryption</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-white">∞</p>
              <p className="text-sm text-blue-200/60 uppercase tracking-widest">Privacy</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-white">10k+</p>
              <p className="text-sm text-blue-200/60 uppercase tracking-widest">Blocks Secured</p>
            </div>
          </div>
        </motion.section>

        {/* Footer Decoration */}
        <footer className="text-center py-8 border-t border-white/10">
          <p className="text-blue-100/40 text-sm">
            © 2025 Pulse Lock Progress. Built for the privacy-first athlete.
          </p>
        </footer>
      </div>

      {/* Background Ornaments */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-10] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      </div>
    </main>
  );
}



