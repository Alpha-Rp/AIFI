import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { NetworkAnimation } from "./NetworkAnimation";

export const Hero = () => {
  const [text, setText] = useState("");
  const phrases = useMemo(
    () => [
      "Artificial Intelligence",
      "Machine Learning",
      "Neural Networks",
      "Computer Vision",
      "Natural Language Process",
    ],
    []
  );

  // Use refs to maintain state across renders
  const phraseIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Constants for timing
    const TYPING_DELAY = 100; // Time between typing each character
    const DELETING_DELAY = 100; // Time between deleting each character
    const PAUSE_AFTER_TYPING = 2000; // Pause time after typing complete phrase
    const PAUSE_AFTER_DELETING = 500; // Pause time after deleting complete phrase

    const typeNextCharacter = () => {
      // Get current state from refs
      const currentPhrase = phrases[phraseIndexRef.current];

      if (isDeletingRef.current) {
        // Deleting mode
        charIndexRef.current -= 1;
        setText(currentPhrase.substring(0, charIndexRef.current));

        if (charIndexRef.current === 0) {
          // Finished deleting
          isDeletingRef.current = false;
          phraseIndexRef.current =
            (phraseIndexRef.current + 1) % phrases.length;

          // Pause before typing next phrase
          timerRef.current = setTimeout(
            typeNextCharacter,
            PAUSE_AFTER_DELETING
          );
        } else {
          // Continue deleting
          timerRef.current = setTimeout(typeNextCharacter, DELETING_DELAY);
        }
      } else {
        // Typing mode
        charIndexRef.current += 1;
        setText(currentPhrase.substring(0, charIndexRef.current));

        if (charIndexRef.current === currentPhrase.length) {
          // Finished typing
          isDeletingRef.current = true;

          // Pause before deleting
          timerRef.current = setTimeout(typeNextCharacter, PAUSE_AFTER_TYPING);
        } else {
          // Continue typing
          timerRef.current = setTimeout(typeNextCharacter, TYPING_DELAY);
        }
      }
    };

    // Start the typing animation after a short delay
    timerRef.current = setTimeout(typeNextCharacter, 1000);

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [phrases]); // Add phrases to the dependency array

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-10"
    >
      <NetworkAnimation />

      <div className="container mx-auto px-6 z-10 max-w-5xl">
        <motion.div
          className="flex flex-col items-center text-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.p
            className="text-electric-blue font-mono mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome to the Future of AI
          </motion.p>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="block">Exploring the Frontiers of</span>
            <span className="relative mt-4 sm:mt-6 block h-[1.8em]">
              <span className="text-gradient-blue inline-block min-w-[5px]">
                {text}
              </span>
              <span className="animate-pulse ml-1 text-electric-blue">|</span>
            </span>
          </motion.h1>

          <motion.p
            className="text-light-slate max-w-2xl text-base md:text-lg lg:text-xl mt-6 sm:mt-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Join the AIFI Club to dive into cutting-edge AI/ML research,
            hands-on projects, expert workshops, and a vibrant community of tech
            enthusiasts.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <a
              href="#about"
              className="px-6 py-3 rounded-md bg-electric-blue text-navy font-medium hover:bg-electric-blue/90 transition-colors hover:scale-105 transform duration-300 shadow-neon-blue text-center max-w-[160px] mx-auto sm:mx-0 w-full sm:w-auto"
            >
              Discover More
            </a>
            <a
              href="#projects"
              className="px-6 py-3 rounded-md bg-transparent border border-electric-blue text-electric-blue font-medium hover:bg-electric-blue/10 transition-colors hover:scale-105 transform duration-300 text-center max-w-[160px] mx-auto sm:mx-0 w-full sm:w-auto"
            >
              View Projects
            </a>
            <a
              href="https://chat.whatsapp.com/CVISpJEYNSoG3hCo6GnEdA"
              className="px-6 py-3 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition-colors hover:scale-105 transform duration-300 text-center max-w-[110px] mx-auto sm:mx-0 w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Us
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-light-slate hover:text-electric-blue transition-colors"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.2,
        }}
      >
        <ChevronDown className="h-8 w-8 animate-bounce shadow-neon-blue" />
      </motion.a>
    </section>
  );
};
