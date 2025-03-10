import { motion } from "framer-motion";
import { useInView } from "@/lib/animation";
import { ArrowRight, BookOpen, FileText, Play, Download } from "lucide-react";

export const Resources = () => {
  const { ref: sectionRef, isInView: sectionIsInView } = useInView(0.1);

  const resources = [
    {
      id: 1,
      title: "Introduction to Neural Networks",
      description:
        "A comprehensive guide to understanding the fundamentals of neural networks.",
      type: "tutorial",
      icon: <BookOpen className="h-5 w-5" />,
      link: "https://victorzhou.com/blog/intro-to-neural-networks/",
    },
    {
      id: 2,
      title: "Machine Learning Algorithms Explained",
      description:
        "Detailed explanation of common ML algorithms with practical examples.",
      type: "article",
      icon: <FileText className="h-5 w-5" />,
      link: "https://www.geeksforgeeks.org/machine-learning-algorithms/",
    },
    {
      id: 3,
      title: "Deep Learning for Computer Vision",
      description:
        "Video tutorial series on implementing CNN models for image processing tasks.",
      type: "video",
      icon: <Play className="h-5 w-5" />,
      link: "https://www.youtube.com/watch?v=u5TAcNEJ-xM",
    },
    {
      id: 4,
      title: "Natural Language Processing Toolkit",
      description:
        "A collection of tools and libraries for working with text data in ML projects.",
      type: "toolkit",
      icon: <Download className="h-5 w-5" />,
      link: "https://www.nltk.org/",
    },
    {
      id: 5,
      title: "Reinforcement Learning Fundamentals",
      description:
        "Learn the basics of RL through practical examples and case studies.",
      type: "tutorial",
      icon: <BookOpen className="h-5 w-5" />,
      link: "https://web.eecs.umich.edu/~baveja/NIPS05RLTutorial/NIPS05RLMainTutorial.pdf",
    },
    {
      id: 6,
      title: "AI Ethics and Responsible Development",
      description:
        "Guidelines and best practices for ethical AI implementation.",
      type: "article",
      icon: <FileText className="h-5 w-5" />,
      link: "https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "tutorial":
        return "bg-blue-500/20 text-blue-400";
      case "article":
        return "bg-purple-500/20 text-purple-400";
      case "video":
        return "bg-red-500/20 text-red-400";
      case "toolkit":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <section
      id="resources"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-dark-navy to-navy"
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
          <span className="text-electric-blue font-mono">Learn & Grow</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Learning Resources
          </h2>
          <div className="w-20 h-1 bg-electric-blue mx-auto mt-4"></div>
          <p className="text-light-slate max-w-2xl mx-auto mt-6">
            Explore our curated collection of AI and machine learning resources
            to enhance your skills and knowledge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.a
              key={resource.id}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-morphism rounded-lg p-6 hover:border-electric-blue/50 transition-all group"
              initial={{ opacity: 0, y: 30 }}
              animate={
                sectionIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-lg ${getTypeColor(
                    resource.type
                  )} mt-1`}
                >
                  {resource.icon}
                </div>
                <div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${getTypeColor(
                      resource.type
                    )}`}
                  >
                    {resource.type.toUpperCase()}
                  </span>
                  <h3 className="text-lg font-semibold mt-2 mb-2 text-white group-hover:text-electric-blue transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-light-slate text-sm mb-4">
                    {resource.description}
                  </p>
                  <div className="inline-flex items-center text-electric-blue group-hover:translate-x-1 transition-transform">
                    <span className="text-sm font-medium">Access resource</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="mt-16 glass-morphism rounded-lg p-8 border-electric-blue/20"
          initial={{ opacity: 0, y: 30 }}
          animate={
            sectionIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Ready to Start Learning?
              </h3>
              <p className="text-light-slate mb-4">
                Join our weekly workshops and get access to exclusive learning
                materials. Our comprehensive learning paths will take you from
                beginner to expert in AI and machine learning.
              </p>
              <a
                href="https://chat.whatsapp.com/CVISpJEYNSoG3hCo6GnEdA"
                className="inline-flex items-center px-6 py-3 rounded-md bg-electric-blue text-navy font-medium hover:bg-electric-blue/90 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Next Workshop <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-neon-green rounded-full opacity-20 blur-2xl"></div>
                <div className="relative flex items-center justify-center h-40 w-40 mx-auto">
                  <BookOpen className="h-20 w-20 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
