import { Github, Linkedin, Mail, MessageSquare, Instagram } from "lucide-react";
import Logo from "../assets/Logo.png";

export const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-dark-navy py-12 border-t border-light-navy/30"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 text-white text-xl font-bold mb-4">
              <div className="relative h-16 sm:h-20 w-auto flex items-center">
                <img
                  src={Logo}
                  alt="AIFI Club Logo"
                  className="h-16 sm:h-20 w-auto"
                />
              </div>
              <div className="flex items-center h-16 sm:h-20">
                <span className="font-space-grotesk mt-1">
                  AIFI<span className="text-electric-blue">Club</span>
                </span>
              </div>
            </div>
            <p className="text-light-slate text-sm mb-6">
              Exploring the frontiers of artificial intelligence and machine
              learning through community, education, and innovation.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Alpha-Rp"
                className="text-light-slate hover:text-electric-blue transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://chat.whatsapp.com/CVISpJEYNSoG3hCo6GnEdA"
                className="text-light-slate hover:text-electric-blue transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/aifi-aiml-culb-socit/?viewAsMember=true"
                className="text-light-slate hover:text-electric-blue transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/aimlclub_cit/"
                className="text-light-slate hover:text-electric-blue transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-light-slate hover:text-electric-blue transition-colors text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-light-slate hover:text-electric-blue transition-colors text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-light-slate hover:text-electric-blue transition-colors text-sm"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#resources"
                  className="text-light-slate hover:text-electric-blue transition-colors text-sm"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-light-slate hover:text-electric-blue transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-light-slate hover:text-electric-blue transition-colors text-sm"
                >
                  Workshops
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-slate hover:text-electric-blue transition-colors text-sm"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-slate hover:text-electric-blue transition-colors text-sm"
                >
                  Publications
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-slate hover:text-electric-blue transition-colors text-sm"
                >
                  Source Code
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light-slate hover:text-electric-blue transition-colors text-sm"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-electric-blue mt-0.5" />
                <span className="text-light-slate text-sm">
                  official.aifi.club@gmail.com
                </span>
              </li>
              <li>
                <a
                  href="https://chat.whatsapp.com/CVISpJEYNSoG3hCo6GnEdA"
                  className="inline-flex items-center px-4 py-2 rounded-md bg-electric-blue text-navy text-sm font-medium hover:bg-electric-blue/90 transition-colors mt-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Our Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-light-navy/30 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-light-slate text-sm text-center md:text-left">
            © {new Date().getFullYear()} AIFI Club. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-light-slate hover:text-electric-blue transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-light-slate hover:text-electric-blue transition-colors text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-light-slate hover:text-electric-blue transition-colors text-sm"
            >
              Code of Conduct
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
