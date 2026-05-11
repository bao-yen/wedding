import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

// Danh sách ảnh từ folder "album"
const PHOTOS = [
  import.meta.env.BASE_URL + "image/album/1.jpeg",
  import.meta.env.BASE_URL + "image/album/2.jpeg",
  import.meta.env.BASE_URL + "image/album/3.jpeg",
  import.meta.env.BASE_URL + "image/album/4.jpeg",
  import.meta.env.BASE_URL + "image/album/5.jpeg",
  import.meta.env.BASE_URL + "image/album/6.jpeg",
  import.meta.env.BASE_URL + "image/album/7.JPG",
  import.meta.env.BASE_URL + "image/album/8.jpeg",
  import.meta.env.BASE_URL + "image/album/9.jpeg",
  import.meta.env.BASE_URL + "image/album/10.jpeg",
  import.meta.env.BASE_URL + "image/album/11.jpeg",
  import.meta.env.BASE_URL + "image/album/12.jpeg",
  import.meta.env.BASE_URL + "image/album/13.jpeg",
  import.meta.env.BASE_URL + "image/album/14.jpeg",
  import.meta.env.BASE_URL + "image/album/15.jpeg",
];

export default function PhotoBook() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = right, -1 = left

  const handleSwipe = (swipeDirection: number) => {
    setDirection(swipeDirection);
    // Chuyển ảnh ngay lập tức
    if (currentIndex < PHOTOS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(PHOTOS.length - 1);
    }
  };

  const handleNext = () => {
    setDirection(1);
    if (currentIndex < PHOTOS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleReset = () => {
    setDirection(1);
    setCurrentIndex(0);
  };

  return (
    <section className="w-full bg-gradient-to-b from-background via-accent/5 to-background py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="font-script text-4xl sm:text-5xl md:text-7xl text-primary mb-3 md:mb-4">
            Our Photo Album
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-4 md:mb-6" />
          <p className="font-serif text-base md:text-lg lg:text-xl text-muted-foreground italic max-w-2xl mx-auto px-4">
            Vuốt hoặc nhấn để xem ảnh tiếp theo
          </p>
        </motion.div>

        {/* Card Stack */}
        <div className="relative w-full max-w-[90vw] sm:max-w-md mx-auto h-[500px] sm:h-[600px] md:h-[700px]">
          <AnimatePresence initial={false} custom={direction}>
            <SwipeCard
              key={currentIndex}
              photo={PHOTOS[currentIndex]}
              index={currentIndex}
              total={PHOTOS.length}
              onSwipe={handleSwipe}
              direction={direction}
            />
          </AnimatePresence>

          {/* Background preview cards */}
          {currentIndex < PHOTOS.length - 1 && (
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
              <div className="w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-white opacity-30 scale-95 translate-y-2">
                <img
                  src={PHOTOS[currentIndex + 1]}
                  alt="Next preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 md:mt-12">
          {/* Previous */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="p-3 sm:p-4 bg-white rounded-full shadow-xl hover:shadow-2xl transition-shadow border-2 border-accent/20 hover:border-accent group"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-accent transition-colors" />
          </motion.button>

          {/* Reset */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleReset}
            className="p-3 sm:p-4 bg-gradient-to-br from-primary to-accent rounded-full shadow-xl hover:shadow-2xl transition-all"
            aria-label="Reset"
          >
            <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.button>

          {/* Next */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="p-3 sm:p-4 bg-white rounded-full shadow-xl hover:shadow-2xl transition-shadow border-2 border-accent/20 hover:border-accent group"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-accent transition-colors" />
          </motion.button>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 md:mt-8 px-4">
          {PHOTOS.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-6 sm:w-8 bg-accent"
                  : index < currentIndex
                  ? "w-1.5 sm:w-2 bg-accent/50"
                  : "w-1.5 sm:w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="text-center mt-3 md:mt-4">
          <p className="text-xs sm:text-sm font-serif text-muted-foreground">
            {currentIndex + 1} / {PHOTOS.length}
          </p>
        </div>
      </div>
    </section>
  );
}

// Swipe Card Component
interface SwipeCardProps {
  photo: string;
  index: number;
  total: number;
  onSwipe: (direction: number) => void;
  direction: number;
}

function SwipeCard({ photo, index, total, onSwipe, direction }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-25, 25]);
  const opacity = useTransform(x, [-200, -50, 0, 50, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_: any, info: any) => {
    // Responsive swipe threshold: smaller for mobile
    const isMobile = window.innerWidth < 640;
    const swipeThreshold = isMobile ? 60 : 80;

    if (Math.abs(info.offset.x) > swipeThreshold) {
      onSwipe(info.offset.x > 0 ? 1 : -1);
    }
  };

  // Variants cho enter/exit animations
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotate: direction > 0 ? 20 : -20,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotate: direction > 0 ? 20 : -20,
    }),
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity, zIndex: 10 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      variants={variants}
      custom={direction}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 500, damping: 40 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
        rotate: { duration: 0.2 },
      }}
    >
      <div className="relative w-full h-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-4 sm:border-8 border-white">
        {/* Photo */}
        <img
          src={photo}
          alt={`Wedding Photo ${index + 1}`}
          className="w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
          loading="eager"
          decoding="async"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Photo Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
          <h3 className="font-script text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">
            Bảo Yến & Phong Nhã
          </h3>
          <p className="font-serif text-xs sm:text-sm md:text-base opacity-90">
            Khoảnh khắc {index + 1} / {total}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
