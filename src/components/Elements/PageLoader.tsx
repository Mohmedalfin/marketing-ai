import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF9F5]">
      <div className="relative flex items-center justify-center mb-6">
        <motion.div
          className="absolute h-20 w-20 rounded-full border-2 border-[#39B772]/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute h-14 w-14 rounded-full border-2 border-dashed border-[#39B772]/40"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        <div className="h-3 w-3 rounded-full bg-[#39B772]" />
      </div>

      <motion.p
        className="text-sm font-bold tracking-widest text-[#545454]/50 uppercase mt-4"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        AI Gency
      </motion.p>
    </div>
  );
}
