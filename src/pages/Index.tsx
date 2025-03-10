import { motion } from 'framer-motion';
import { NavBar } from '@/components/NavBar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Resources } from '@/components/Resources';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Chatbot } from '@/components/Chatbot';
import { EventsSection } from "@/components/EventsSection";
import { MembersSection } from "@/components/MembersSection";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen overflow-x-hidden selection:bg-electric-blue/20 selection:text-white"
    >
      <ParticleBackground />
      <ScrollProgress />
      <NavBar />
      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Resources />
        <EventsSection />
        <MembersSection />
        <Footer />
      </div>
      <Chatbot />
    </motion.div>
  );
};

export default Index;
