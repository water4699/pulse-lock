"use client";

import { useFhevm } from "../fhevm/useFhevm";
import { useInMemoryStorage } from "../hooks/useInMemoryStorage";
import { useRainbowEthersSigner } from "../hooks/rainbow/useRainbowEthersSigner";
import { useStrengthTracker } from "@/hooks/useStrengthTracker";
import { errorNotDeployed } from "./ErrorNotDeployed";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dumbbell, 
  History, 
  Lock, 
  Unlock, 
  RefreshCw, 
  Plus, 
  AlertCircle,
  ChevronRight,
  Loader2,
  Trophy,
  Scale,
  Repeat
} from "lucide-react";

export const StrengthTrackerDemo = () => {
  const { storage: fhevmDecryptionSignatureStorage } = useInMemoryStorage();
  const {
    provider,
    chainId,
    accounts,
    isConnected,
    connect,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain,
    sameSigner,
    initialMockChains,
  } = useRainbowEthersSigner();

  const {
    instance: fhevmInstance,
    error: fhevmError,
    status: fhevmStatus,
  } = useFhevm({
    provider,
    chainId,
    initialMockChains,
    enabled: true,
  });

  const strengthTracker = useStrengthTracker({
    instance: fhevmInstance,
    fhevmDecryptionSignatureStorage,
    eip1193Provider: provider,
    chainId,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain,
    sameSigner,
  });

  const [weight, setWeight] = useState<string>("");
  const [sets, setSets] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{weight?: string, sets?: string, reps?: string}>({});

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: { opacity: 0, y: -20 }
  };

  const buttonClass =
    "relative overflow-hidden inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg " +
    "transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-500/25 active:scale-95 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 " +
    "disabled:opacity-50 disabled:pointer-events-none group";

  const inputClass =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all";

  if (!isConnected) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto mt-20 text-center p-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10"
      >
        <div className="w-20 h-20 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-blue-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Vault is Locked
        </h2>
        <p className="text-blue-100/60 mb-8 max-w-md mx-auto">
          Connect your wallet to access your private strength records. All data remains encrypted on-chain.
        </p>
        <button className={buttonClass} onClick={connect}>
          <span className="relative z-10 flex items-center gap-2">
            Initialize Connection <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
        </button>
      </motion.div>
    );
  }

  if (strengthTracker.isDeployed === false) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-2xl text-center"
      >
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Network Error</h2>
        <p className="text-red-200/70 mb-4">Contract not found on the current network ({chainId}).</p>
      </motion.div>
    );
  }

  const validateForm = () => {
    const errors: {weight?: string, sets?: string, reps?: string} = {};
    const weightNum = parseInt(weight);
    const setsNum = parseInt(sets);
    const repsNum = parseInt(reps);

    if (isNaN(weightNum) || weightNum <= 0) {
      errors.weight = "Invalid weight";
    }
    if (isNaN(setsNum) || setsNum <= 0) {
      errors.sets = "Invalid sets";
    }
    if (isNaN(repsNum) || repsNum <= 0) {
      errors.reps = "Invalid reps";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRecord = () => {
    if (!validateForm()) {
      return;
    }

    const weightNum = parseInt(weight);
    const setsNum = parseInt(sets);
    const repsNum = parseInt(reps);

    strengthTracker.recordTraining(weightNum, setsNum, repsNum);
    setWeight("");
    setSets("");
    setReps("");
    setFormErrors({});
  };

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Input Form Card */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Dumbbell size={120} className="rotate-12" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Plus className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              New Entry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-blue-100/60 ml-1">
                <Scale className="w-4 h-4" /> Max Weight (kg)
              </label>
              <input
                type="number"
                className={`${inputClass} ${formErrors.weight ? 'ring-2 ring-red-500/50 border-red-500/50' : ''}`}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0.0"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-blue-100/60 ml-1">
                <Trophy className="w-4 h-4" /> Sets
              </label>
              <input
                type="number"
                className={`${inputClass} ${formErrors.sets ? 'ring-2 ring-red-500/50 border-red-500/50' : ''}`}
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-blue-100/60 ml-1">
                <Repeat className="w-4 h-4" /> Reps
              </label>
              <input
                type="number"
                className={`${inputClass} ${formErrors.reps ? 'ring-2 ring-red-500/50 border-red-500/50' : ''}`}
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <button
            className={buttonClass}
            disabled={!strengthTracker.canRecord}
            onClick={handleRecord}
          >
            <span className="flex items-center gap-2">
              {strengthTracker.isRecording ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Encrypting Reps...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Secure Record
                </>
              )}
            </span>
          </button>

          <AnimatePresence>
            {!strengthTracker.canRecord && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 bg-white/5 rounded-xl border border-white/5"
              >
                <p className="text-sm text-blue-100/40 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {fhevmStatus === "loading" ? "Initializing FHEVM vault..." : "Awaiting signature..."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* History Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <History className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Vault History
            </h2>
          </div>
          <button
            className="p-3 bg-white/5 text-white/60 rounded-xl hover:bg-white/10 hover:text-white transition-all disabled:opacity-50"
            onClick={strengthTracker.loadRecords}
            disabled={!strengthTracker.canLoadRecords}
          >
            <RefreshCw className={`w-5 h-5 ${strengthTracker.isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {strengthTracker.records.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 px-4 bg-white/5 rounded-2xl border border-dashed border-white/10"
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white/20" />
                </div>
                <p className="text-blue-100/40 font-medium">No encrypted records found in the vault.</p>
              </motion.div>
            ) : (
              strengthTracker.records.map((record, index) => (
                <motion.div
                  key={`${index}-${record.timestamp}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/40 group-hover:text-blue-400 transition-colors">
                        {record.decrypted ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">Record #{index + 1}</p>
                        <p className="text-blue-100/40 text-sm flex items-center gap-2">
                          <History className="w-3 h-3" /> {formatDate(record.timestamp)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {record.decrypted ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex gap-3"
                        >
                          <div className="px-4 py-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <span className="text-xs text-blue-400/60 block uppercase font-bold tracking-wider">Weight</span>
                            <span className="text-xl font-black text-blue-400">{record.decrypted.weight.toString()} <small className="text-xs">kg</small></span>
                          </div>
                          <div className="px-4 py-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
                            <span className="text-xs text-purple-400/60 block uppercase font-bold tracking-wider">Sets</span>
                            <span className="text-xl font-black text-purple-400">{record.decrypted.sets.toString()}</span>
                          </div>
                          <div className="px-4 py-2 bg-green-500/10 rounded-xl border border-green-500/20">
                            <span className="text-xs text-green-400/60 block uppercase font-bold tracking-wider">Reps</span>
                            <span className="text-xl font-black text-green-400">{record.decrypted.reps.toString()}</span>
                          </div>
                        </motion.div>
                      ) : (
                        <button
                          className="px-6 py-3 bg-white/5 hover:bg-white/20 text-white font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
                          onClick={() => strengthTracker.decryptRecord(index)}
                          disabled={strengthTracker.isDecrypting}
                        >
                          {strengthTracker.isDecrypting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Unlock className="w-4 h-4" />
                          )}
                          Decrypt Data
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {strengthTracker.message && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-4 bg-blue-600 text-white rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 z-50 backdrop-blur-xl"
          >
            <AlertCircle className="w-5 h-5 text-blue-200" />
            <span className="font-medium">{strengthTracker.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


