import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";

interface Wish {
  timestamp: string;
  name: string;
  message: string;
}

export interface WishToastRef {
  refresh: () => Promise<void>;
}

const WishToast = forwardRef<WishToastRef>((props, ref) => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const fetchWishes = async () => {
    try {
      const response = await fetch('/api/get-wishes');
      if (!response.ok) throw new Error('Failed to fetch wishes');

      const data = await response.json();
      const filteredWishes = (data.wishes || []).filter((w: Wish) =>
        w.name && w.message && w.name !== "Họ và Tên" // Filter out header row
      );

      setWishes(filteredWishes);
      if (filteredWishes.length > 0) {
        setIsVisible(true);
      }
    } catch (err) {
      console.error('Error fetching wishes:', err);
    }
  };

  useImperativeHandle(ref, () => ({
    refresh: fetchWishes
  }));

  useEffect(() => {
    fetchWishes();
  }, []);

  useEffect(() => {
    if (wishes.length === 0 || isPaused) return;

    const timer = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % wishes.length);
        setIsVisible(true);
      }, 500); // Wait for fade out
    }, 5000); // Show each wish for 5 seconds

    return () => clearInterval(timer);
  }, [wishes.length, currentIndex, isPaused]);

  if (wishes.length === 0) return null;

  const currentWish = wishes[currentIndex];

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md">
      <AnimatePresence>
        {isVisible && currentWish && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl border-2 border-primary/20 p-6 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Đóng"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-primary fill-primary animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg truncate text-foreground">
                  {currentWish.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {new Date(currentWish.timestamp).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>

            {/* Message */}
            <p className="font-serif text-muted-foreground leading-relaxed line-clamp-4 mb-4">
              "{currentWish.message}"
            </p>

            {/* Progress indicator */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {wishes.slice(0, 5).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      idx === currentIndex % 5
                        ? 'w-6 bg-primary'
                        : 'w-1.5 bg-primary/20'
                    }`}
                  />
                ))}
                {wishes.length > 5 && (
                  <span className="text-xs text-muted-foreground ml-2">
                    +{wishes.length - 5}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground font-script text-lg">
                Lời chúc {currentIndex + 1}/{wishes.length}
              </p>
            </div>

            {/* Pause indicator */}
            {isPaused && (
              <div className="absolute top-3 left-3">
                <div className="bg-primary/90 text-white text-xs px-2 py-1 rounded-full">
                  Tạm dừng
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

WishToast.displayName = 'WishToast';

export default WishToast;
