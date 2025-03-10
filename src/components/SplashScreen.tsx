import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/Logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [loadingText, setLoadingText] = useState("Initializing");

  // Loading text animation
  useEffect(() => {
    const texts = [
      "Initializing",
      "Loading AI modules",
      "Connecting neural networks",
      "Processing data",
      "Almost there",
    ];

    const textInterval = setInterval(() => {
      const textIndex = Math.floor((progress / 100) * texts.length);
      setLoadingText(texts[Math.min(textIndex, texts.length - 1)]);
    }, 1000);

    return () => clearInterval(textInterval);
  }, [progress]);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        // Make progress slower with smaller increments
        const increment = Math.max(
          1,
          Math.floor(5 * Math.random() * (1 - prev / 100))
        );
        const newProgress = Math.min(100, prev + increment);

        if (newProgress >= 100) {
          clearInterval(interval);

          // Add a small delay before completing
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 500); // Longer delay before calling onComplete
          }, 400);

          return 100;
        }
        return newProgress;
      });
    }, 60); // Slower interval for more gradual progress

    return () => clearInterval(interval);
  }, [onComplete]);

  // Particle effect for background
  const particles = Array.from({ length: 20 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-electric-blue/20"
      initial={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      }}
      animate={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        transition: {
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
      style={{
        width: `${Math.random() * 10 + 5}px`,
        height: `${Math.random() * 10 + 5}px`,
      }}
    />
  ));

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 bg-navy z-50 flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background particles */}
          {particles}

          {/* Pulsing glow behind logo */}
          <motion.div
            className="absolute w-40 h-40 rounded-full bg-electric-blue/20 filter blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="flex flex-col items-center z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
              className="mb-8"
            >
              <img
                src={Logo}
                alt="AIFI Club Logo"
                className="h-32 w-auto drop-shadow-glow"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center mb-2"
            >
              <span className="font-space-grotesk text-3xl font-bold text-white">
                AIFI<span className="text-electric-blue">Club</span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-light-slate mb-8 text-sm"
            >
              Exploring the Frontiers of AI
            </motion.p>

            <div className="w-64 h-2 bg-navy-light/30 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full bg-gradient-to-r from-electric-blue to-neon-green"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="h-8 mt-2">
              <motion.p
                key={loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-light-slate text-xs text-center"
              >
                {loadingText}... {progress}%
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
