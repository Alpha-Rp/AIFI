import { motion } from "framer-motion";
import { useInView } from "@/lib/animation";
import { BrainCircuit, Dna, Users, BookOpen } from "lucide-react";

export const About = () => {
  const { ref: sectionRef, isInView: sectionIsInView } = useInView(0.1);

  const stats = [
    {
      icon: <Users />,
      value: "50+",
      label: "Members",
      description: "Active enthusiasts from diverse backgrounds",
    },
    {
      icon: <BrainCircuit />,
      value: "35+",
      label: "Projects",
      description: "Cutting-edge AI/ML implementations",
    },
    {
      icon: <BookOpen />,
      value: "10+",
      label: "Blogs",
      description: "Hands-on learning experiences per year",
    },
    {
      icon: <Dna />,
      value: "12+",
      label: "Publications",
      description: "Research papers and technical articles",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-navy to-dark-navy"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={
            sectionIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6 }}
        >
          <span className="text-electric-blue font-mono">Who We Are</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            About AIFI Club
          </h2>
          <div className="w-20 h-1 bg-electric-blue mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={
              sectionIsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gradient-blue">
              Our Mission
            </h3>
            <p className="text-light-slate mb-6">
              AIFI Club is dedicated to fostering technical excellence through
              workshops, hands-on projects, and hackathons in fields like
              programming, robotics, and data science. We believe in innovation
              and practical problem-solving to tackle real-world challenges.
            </p>
            <p className="text-light-slate mb-6">
              We build a strong network of peers, mentors, and industry
              professionals, empowering students with leadership skills and
              confidence to pursue their passions in engineering and technology.
            </p>
            <div className="relative p-6 glass-morphism rounded-lg mt-8">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-electric-blue"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-electric-blue"></div>
              <p className="text-white italic">
                "We're building a community where innovation meets
                implementation, where theories transform into tangible
                solutions, and where the future of AI is shaped by diverse
                perspectives."
              </p>
              <p className="text-electric-blue mt-3 font-medium">
                — Prof. Rashmi C, Faculty Coordinator
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-morphism rounded-lg p-6 text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  sectionIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="text-electric-blue mb-3 w-12 h-12 flex items-center justify-center border border-electric-blue/30 rounded-full">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-electric-blue font-semibold mb-2">
                  {stat.label}
                </div>
                <p className="text-sm text-light-slate">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-24 mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={
            sectionIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Our Vision</h3>
          <div className="glass-morphism rounded-lg p-8 border-electric-blue/20">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h4 className="text-xl font-semibold mb-4 text-gradient-blue">
                  Empowering Through Innovation
                </h4>
                <p className="text-light-slate mb-4">
                  We envision a future where students become proficient in
                  innovation, technical skills, real-world problem solving,
                  critical thinking, and effective collaboration.
                </p>
                <p className="text-light-slate">
                  Our goal is to create a thriving ecosystem where AI
                  enthusiasts can explore cutting-edge technologies, contribute
                  to meaningful projects, and develop the skills needed to shape
                  the future of artificial intelligence.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative p-6 glass-morphism rounded-lg w-full">
                  <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-electric-blue"></div>
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-electric-blue"></div>
                  <p className="text-white italic">
                    "Striving to empower students to become proficient in
                    innovation, technical skills, real-world problem solving,
                    critical thinking and effective collaboration."
                  </p>
                  <p className="text-electric-blue mt-3 font-medium">
                    — AIFI Club Vision Statement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={
            sectionIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">What We Do</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-morphism rounded-lg p-6 hover:border-electric-blue/50 transition-colors">
              <h4 className="text-xl font-semibold mb-3 text-electric-blue">
                Research Projects
              </h4>
              <p className="text-light-slate">
                Collaborate on cutting-edge AI and ML research projects spanning
                computer vision, NLP, reinforcement learning, and more.
              </p>
            </div>
            <div className="glass-morphism rounded-lg p-6 hover:border-electric-blue/50 transition-colors">
              <h4 className="text-xl font-semibold mb-3 text-electric-blue">
                Hands-on Workshops
              </h4>
              <p className="text-light-slate">
                Participate in regular workshops led by industry experts and
                academic researchers on the latest AI tools and techniques.
              </p>
            </div>
            <div className="glass-morphism rounded-lg p-6 hover:border-electric-blue/50 transition-colors">
              <h4 className="text-xl font-semibold mb-3 text-electric-blue">
                Community Events
              </h4>
              <p className="text-light-slate">
                Network with like-minded individuals at hackathons, conferences,
                and social gatherings focused on AI innovation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
