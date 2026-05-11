import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart } from "lucide-react";
import { useState } from "react";

// Dữ liệu ảnh cô dâu chú rể - bạn có thể thay đổi đường dẫn ảnh ở đây
const WEDDING_PHOTOS = [
  "/image/slide/2.jpg",
  "/image/slide/3.jpg",
  "/image/slide/1.jpg",
];

// Dữ liệu lịch tháng 6/2026
const CALENDAR_DATA = {
  month: 6,
  year: 2026,
  weddingDay: 6,
  days: [
    { date: 1 }, { date: 2 }, { date: 3 }, { date: 4 }, { date: 5 }, { date: 6 }, { date: 7 },
    { date: 8 }, { date: 9 }, { date: 10 }, { date: 11 }, { date: 12 }, { date: 13 }, { date: 14 },
    { date: 15 }, { date: 16 }, { date: 17 }, { date: 18 }, { date: 19 }, { date: 20 }, { date: 21 },
    { date: 22 }, { date: 23 }, { date: 24 }, { date: 25 }, { date: 26 }, { date: 27 }, { date: 28 },
    { date: 29 }, { date: 30 },
  ],
};

export default function InvitationCard() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? WEDDING_PHOTOS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === WEDDING_PHOTOS.length - 1 ? 0 : prev + 1));
  };

  const getPhotoIndex = (offset: number) => {
    const index = currentIndex + offset;
    if (index < 0) return WEDDING_PHOTOS.length + index;
    if (index >= WEDDING_PHOTOS.length) return index - WEDDING_PHOTOS.length;
    return index;
  };

  const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-amber-50/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-800 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-800 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Card Container with Border */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Decorative Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-amber-800 to-red-900 rounded-3xl blur-sm" />
            
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-red-50 via-white to-amber-50 rounded-3xl border-4 border-red-900/80 shadow-2xl overflow-hidden">
              {/* Inner Content with Padding */}
              <div className="p-8 md:p-12">
                
                {/* Title Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={headerInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center mb-12"
                >
                  <h2 className="font-script text-5xl md:text-7xl text-red-900 mb-4">
                    Trân Trọng Kính Mời
                  </h2>
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-800" />
                    <Heart className="w-6 h-6 text-red-800" fill="currentColor" />
                    <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-800" />
                  </div>
                </motion.div>

                {/* Photo Carousel - 3 Slides with Center Focus */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={headerInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mb-12 overflow-hidden"
                >
                  <div className="relative max-w-5xl mx-auto px-2 sm:px-4">
                    {/* Three Photos Container */}
                    <div className="flex items-center justify-center gap-2 sm:gap-4">

                      {/* Left Photo */}
                      <AnimatePresence initial={false} mode="popLayout">
                        <motion.div
                          key={`left-${currentIndex}`}
                          layout
                          initial={{ opacity: 0, x: -50, scale: 0.7 }}
                          animate={{ opacity: 0.6, x: 0, scale: 0.85 }}
                          exit={{ opacity: 0, x: 50, scale: 0.7 }}
                          transition={{
                            layout: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 }
                          }}
                          onClick={handlePrev}
                          className="relative w-20 h-28 sm:w-40 md:w-52 lg:w-64 sm:h-52 md:h-64 lg:h-80 rounded-lg sm:rounded-xl overflow-hidden shadow-lg border border-red-900/40 sm:border-2 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                        >
                          <img
                            src={WEDDING_PHOTOS[getPhotoIndex(-1)]}
                            alt="Previous photo"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Center Main Photo */}
                      <AnimatePresence initial={false} mode="popLayout">
                        <motion.div
                          key={`center-${currentIndex}`}
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{
                            layout: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 }
                          }}
                          className="relative w-32 h-40 sm:w-56 md:w-72 lg:w-80 sm:h-72 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 border-red-900/70 sm:border-4 z-10 flex-shrink-0"
                        >
                          <img
                            src={WEDDING_PHOTOS[currentIndex]}
                            alt={`Wedding photo ${currentIndex + 1}`}
                            className="w-full h-full object-cover"
                            loading="eager"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Right Photo */}
                      <AnimatePresence initial={false} mode="popLayout">
                        <motion.div
                          key={`right-${currentIndex}`}
                          layout
                          initial={{ opacity: 0, x: 50, scale: 0.7 }}
                          animate={{ opacity: 0.6, x: 0, scale: 0.85 }}
                          exit={{ opacity: 0, x: -50, scale: 0.7 }}
                          transition={{
                            layout: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 }
                          }}
                          onClick={handleNext}
                          className="relative w-20 h-28 sm:w-40 md:w-52 lg:w-64 sm:h-52 md:h-64 lg:h-80 rounded-lg sm:rounded-xl overflow-hidden shadow-lg border border-red-900/40 sm:border-2 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                        >
                          <img
                            src={WEDDING_PHOTOS[getPhotoIndex(1)]}
                            alt="Next photo"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                      {WEDDING_PHOTOS.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                          }}
                          className={`transition-all duration-300 rounded-full ${
                            index === currentIndex
                              ? "w-10 h-2.5 bg-red-900"
                              : "w-2.5 h-2.5 bg-red-900/30 hover:bg-red-900/60"
                          }`}
                          aria-label={`Go to photo ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Wedding Info Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={headerInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mb-12 text-center"
                >
                  {/* Title */}
                  <h3 className="font-script text-3xl md:text-4xl text-red-900 mb-8">
                    Tham Dự Tiệc Mừng Lễ Thành Hôn
                  </h3>

                  {/* Time and Date Info */}
                  <div className="space-y-6 max-w-md mx-auto">
                    {/* Time */}
                    <div className="text-center space-y-1">
                      <p className="text-sm text-red-800/70 font-medium">Thời gian</p>
                      <div className="flex items-center justify-center gap-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-red-800" />
                        <p className="text-2xl md:text-3xl font-bold text-red-900 whitespace-nowrap">12:00</p>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-red-800" />
                      </div>
                    </div>

                    {/* Date */}
                    <div className="text-center space-y-1">
                      <p className="text-sm text-red-800/70 font-medium">Ngày</p>
                      <div className="flex items-center justify-center gap-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-red-800" />
                        <p className="text-xl md:text-2xl font-semibold text-red-900 whitespace-nowrap">
                          Thứ 7 - Ngày 06 - 06 - 2026
                        </p>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-red-800" />
                      </div>
                    </div>

                    {/* Year
                    <div className="text-center space-y-1">
                      <p className="text-sm text-red-800/70 font-medium">Năm</p>
                      <div className="flex items-center justify-center gap-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-red-800" />
                        <p className="text-2xl md:text-3xl font-bold text-red-900 whitespace-nowrap">2026</p>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-red-800" />
                      </div>
                    </div> */}
                  </div>

                  {/* Decorative Hearts */}
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Heart className="w-4 h-4 text-red-800/60" fill="currentColor" />
                    <Heart className="w-5 h-5 text-red-800" fill="currentColor" />
                    <Heart className="w-4 h-4 text-red-800/60" fill="currentColor" />
                  </div>
                </motion.div>

                {/* Calendar Container */}
                <div className="mt-12">
                  {/* Week Days */}
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {weekDays.map((day) => (
                      <div key={day} className="text-center font-semibold text-red-900/70 text-sm">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-2">
                    {CALENDAR_DATA.days.map((day, index) => (
                      <div
                        key={index}
                        className="aspect-square flex items-center justify-center relative"
                      >
                        {day.date ? (
                          day.date === CALENDAR_DATA.weddingDay ? (
                            // Wedding Day with Heart
                            <div className="relative w-full h-full flex items-center justify-center">
                              <Heart 
                                className="w-full h-full text-red-700 absolute inset-0 p-1" 
                                fill="currentColor" 
                              />
                              <span className="relative z-10 font-bold text-white text-sm">
                                {day.date}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-700 text-sm font-medium">
                              {day.date}
                            </span>
                          )
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Decorative Line */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={headerInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 1 }}
                  className="mt-12 flex items-center justify-center gap-3"
                >
                  <div className="h-px w-32 bg-gradient-to-r from-transparent to-red-800" />
                  <Heart className="w-5 h-5 text-red-800" fill="currentColor" />
                  <Heart className="w-4 h-4 text-red-800" fill="currentColor" />
                  <Heart className="w-5 h-5 text-red-800" fill="currentColor" />
                  <div className="h-px w-32 bg-gradient-to-l from-transparent to-red-800" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
