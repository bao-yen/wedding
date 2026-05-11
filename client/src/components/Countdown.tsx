import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  // Ngày cưới: 06/06/2026 lúc 11:00
  const weddingDate = new Date("2026-06-06T11:00:00").getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 py-2 sm:px-6 sm:py-4 shadow-xl border-2 border-red-900/30 min-w-[60px] sm:min-w-[100px]">
        <div className="text-2xl sm:text-5xl font-bold text-red-900 tabular-nums">
          {value.toString().padStart(2, "0")}
        </div>
      </div>
      <div className="mt-2 text-xs sm:text-sm font-medium text-white drop-shadow-lg">
        {label}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center mb-6"
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-script text-white drop-shadow-lg mb-2">
          Đếm Ngược Đến Ngày Trọng Đại
        </h3>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent mx-auto" />
      </motion.div>

      <div className="flex justify-center gap-2 sm:gap-4 md:gap-6">
        <TimeBox value={timeLeft.days} label="Ngày" />
        <TimeBox value={timeLeft.hours} label="Giờ" />
        <TimeBox value={timeLeft.minutes} label="Phút" />
        <TimeBox value={timeLeft.seconds} label="Giây" />
      </div>
    </div>
  );
}
