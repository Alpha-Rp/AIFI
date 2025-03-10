import { EventCard } from "./EventCard";
import { motion } from "framer-motion";

export const EventsSection = () => {
  const events = [
    {
      title: "Hackathon",
      description: "24-hour coding competition to solve real-world problems. Join us for an exciting coding marathon!",
      date: "Coming Soon",
      type: "hackathon" as const
    },
    {
      title: "Treasure Hunt",
      description: "Tech-themed treasure hunt across campus with exciting puzzles and rewards.",
      date: "Coming Soon",
      type: "treasure-hunt" as const
    },
    {
      title: "Tech Talk",
      description: "Industry experts sharing their knowledge and experiences in various tech domains.",
      date: "Coming Soon",
      type: "tech-talk" as const
    }
  ];

  return (
    <section id="events" className="py-24 bg-background/50 backdrop-blur-sm">
      <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
        Upcoming Events
        <div className="mt-2 mx-auto w-24 h-1 bg-electric-blue rounded-full" />
      </h2>
      <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto px-8">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <EventCard {...event} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
