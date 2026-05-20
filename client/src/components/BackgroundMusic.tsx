import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// Thay đổi VIDEO_ID này thành ID của video YouTube bạn muốn
// Ví dụ: https://www.youtube.com/watch?v=dQw4w9WgXcQ => VIDEO_ID = "dQw4w9WgXcQ"
const YOUTUBE_VIDEO_ID = "0H88LgRuC6M"; // Silverscrape - League of Legends

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [showWelcome, setShowWelcome] = useState(false); // Bắt đầu là false
  const playerRef = useRef<HTMLDivElement>(null);
  const volumeIntervalRef = useRef<any>(null);
  const loopIntervalRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Delay hiển thị modal sau khi LoadingScreen kết thúc (3 giây)
    const delayTimer = setTimeout(() => {
      setShowWelcome(true);
    }, 3000); // 3s loading, hiển thị ngay sau khi LoadingScreen kết thúc

    return () => clearTimeout(delayTimer);
  }, []);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      const ytPlayer = new window.YT.Player("youtube-player", {
        height: "1",
        width: "1",
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          playsinline: 1, // Quan trọng để không hiện video trên mobile
          start: 8,
          end: 261,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          rel: 0,
          mute: 1, // Bắt đầu ở chế độ tắt tiếng để lách luật autoplay của trình duyệt
        },
        events: {
          onReady: (event: any) => {
            const ytPlayer = event.target;
            ytPlayer.playVideo(); // Thử play ngay (vì đã mute nên tỉ lệ thành công cao)
            
            // Manual loop check (Secondary fallback)
            if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
            loopIntervalRef.current = setInterval(() => {
              const currentTime = ytPlayer.getCurrentTime();
              if (currentTime >= 261) {
                ytPlayer.seekTo(8);
                ytPlayer.playVideo();
              }
            }, 1000);

            setPlayer(ytPlayer);
            setIsReady(true);
          },
          onStateChange: (event: any) => {
            // Update playing state
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
            // Auto-replay if ended
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(8); // Quay lại giây thứ 8
              event.target.playVideo();
            }
          },
        },
      });
    };

    return () => {
      if (volumeIntervalRef.current) clearInterval(volumeIntervalRef.current);
      if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
    };
  }, []);

  const handleWelcomeClick = () => {
    if (player && isReady) {
      // Trigger pháo hoa
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 150 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      // Play music
      player.unMute(); // Mở tiếng
      player.setVolume(50);
      player.playVideo()
      setIsPlaying(true);
      setShowWelcome(false);
    }
  };

  const togglePlay = () => {
    if (player && isReady) {
      if (isPlaying) {
        player.pauseVideo();
        setIsPlaying(false);
      } else {
        player.playVideo();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      {/* Invisible YouTube Player */}
      <div
        id="youtube-player"
        ref={playerRef}
        style={{
          position: "fixed",
          left: "0",
          top: "0",
          width: "1px",
          height: "1px",
          opacity: "0.01",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      {/* Welcome Overlay - Show on first load */}
      <AnimatePresence>
        {showWelcome && isReady && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-gradient-to-br from-red-50 via-white to-amber-50 rounded-3xl p-8 md:p-12 max-w-lg mx-4 text-center shadow-2xl border-4 border-red-900/80 relative"
            >
            {/* Decorative Hearts */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
              <Heart className="w-5 h-5 text-red-800/60" fill="currentColor" />
              <Heart className="w-6 h-6 text-red-800" fill="currentColor" />
              <Heart className="w-5 h-5 text-red-800/60" fill="currentColor" />
            </div>

            <div className="mt-6">
              <h3 className="font-script text-4xl md:text-5xl text-red-900 mb-6">
                Trân Trọng Kính Mời
              </h3>

              <div className="space-y-4 text-gray-700 mb-8">
                <p className="text-lg leading-relaxed">
                  Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi
                </p>
                <div className="flex items-center justify-center gap-3 my-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-800" />
                  <Heart className="w-5 h-5 text-red-800" fill="currentColor" />
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-800" />
                </div>
                <p className="text-base text-gray-600 italic">
                  Hãy cùng chúng tôi chia sẻ niềm vui trong ngày trọng đại này
                </p>
              </div>

              <button
                onClick={handleWelcomeClick}
                className="bg-red-900 hover:bg-red-800 text-white px-10 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-3 mx-auto"
              >
                <Music className="w-5 h-5" />
                <span>Xem Thiệp Mời</span>
              </button>
            </div>

            {/* Bottom decorative line */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-800" />
              <Heart className="w-4 h-4 text-red-800" fill="currentColor" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-800" />
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Music Control Button */}
      <button
        onClick={togglePlay}
        className="fixed bottom-8 right-8 z-50 bg-red-900 hover:bg-red-800 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110"
        aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6" />
        ) : (
          <VolumeX className="w-6 h-6" />
        )}
      </button>
    </>
  );
}
