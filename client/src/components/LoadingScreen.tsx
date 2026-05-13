import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isSplitting, setIsSplitting] = useState(false);

  useEffect(() => {
    // Sau 2 giây, bắt đầu animation chia đôi và mở màn
    const splitTimer = setTimeout(() => {
      setIsSplitting(true);
      // Sau khi animation mở màn hoàn tất (1s), gọi onComplete
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 1000);
    }, 2000);

    return () => {
      clearTimeout(splitTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Top Half */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-br from-red-50 via-white to-amber-50 flex items-end justify-center pb-8"
            initial={{ y: 0 }}
            animate={isSplitting ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="font-script text-4xl md:text-7xl text-red-900 mb-2">
                Bảo Yến & Phong Nhã
              </h1>
            </motion.div>
          </motion.div>

          {/* Bottom Half */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-br from-red-50 via-white to-amber-50 flex items-start justify-center pt-8"
            initial={{ y: 0 }}
            animate={isSplitting ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              className="text-center"
            >
              <p className="font-serif text-xl md:text-2xl text-red-900/70 tracking-widest uppercase mb-4">
                Save the Date
              </p>
              <div className="flex justify-center space-x-2">
                <motion.div
                  className="w-3 h-3 bg-red-900 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-3 h-3 bg-red-900 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-3 h-3 bg-red-900 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
