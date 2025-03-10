
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/lib/animation';
import { ArrowRight, Code, Eye, Github } from 'lucide-react';

export const Projects = () => {
  const { ref: sectionRef, isInView: sectionIsInView } = useInView(0.1);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ml', label: 'Machine Learning' },
    { id: 'cv', label: 'Computer Vision' },
    { id: 'nlp', label: 'NLP' },
    { id: 'rl', label: 'Reinforcement Learning' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Neural Image Classifier',
      description: 'A deep learning model for image classification using convolutional neural networks.',
      image: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=2070&auto=format&fit=crop',
      tags: ['ml', 'cv'],
      link: '#',
      github: '#',
      demo: '#',
    },
    {
      id: 2,
      title: 'Sentiment Analysis Tool',
      description: 'Natural language processing tool that identifies and extracts subjective information from text sources.',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
      tags: ['ml', 'nlp'],
      link: '#',
      github: '#',
      demo: '#',
    },
    {
      id: 3,
      title: 'Reinforcement Learning Agent',
      description: 'An RL agent that learns to navigate complex environments through trial and error.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop',
      tags: ['ml', 'rl'],
      link: '#',
      github: '#',
      demo: '#',
    },
    {
      id: 4,
      title: 'Facial Recognition System',
      description: 'A computer vision application that identifies people in images or video based on facial features.',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop',
      tags: ['ml', 'cv'],
      link: '#',
      github: '#',
      demo: '#',
    },
    {
      id: 5,
      title: 'Language Translation Model',
      description: 'Neural machine translation system that automatically translates text from one language to another.',
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop',
      tags: ['ml', 'nlp'],
      link: '#',
      github: '#',
      demo: '#',
    },
    {
      id: 6,
      title: 'Autonomous Game Agent',
      description: 'Reinforcement learning-based agent that learns to play games through experience.',
      image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=2070&auto=format&fit=crop',
      tags: ['ml', 'rl'],
      link: '#',
      github: '#',
      demo: '#',
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.tags.includes(activeFilter));

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-navy">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-electric-blue font-mono">Our Work</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Featured Projects</h2>
          <div className="w-20 h-1 bg-electric-blue mx-auto mt-4"></div>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeFilter === filter.id
                  ? 'bg-electric-blue text-navy font-medium'
                  : 'text-light-slate hover:text-white border border-light-navy hover:border-electric-blue'
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="glass-morphism rounded-lg overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={sectionIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-navy bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <a
                    href={project.github}
                    className="p-2 rounded-full bg-light-navy hover:bg-electric-blue text-white transition-colors"
                    aria-label="View on GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={project.demo}
                    className="p-2 rounded-full bg-light-navy hover:bg-electric-blue text-white transition-colors"
                    aria-label="View Demo"
                  >
                    <Eye className="h-5 w-5" />
                  </a>
                  <a
                    href={project.link}
                    className="p-2 rounded-full bg-light-navy hover:bg-electric-blue text-white transition-colors"
                    aria-label="View Project"
                  >
                    <Code className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2 py-1 rounded-full bg-light-navy text-light-slate"
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-electric-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-light-slate text-sm mb-4">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  className="inline-flex items-center text-electric-blue hover:text-white transition-colors text-sm font-medium"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 rounded-md border border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-navy transition-colors"
          >
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
