import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Send,
  MapPin,
  Clock,
  Globe,
  MessageCircle,
  Calendar,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Copy,
  Heart,
  Coffee,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../components/Section";
import type { VisibleElements } from "../types/common";

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  darkMode: boolean;
  visibleElements: VisibleElements;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  darkMode,
  visibleElements,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeContact, setActiveContact] = useState<string | null>(null);

  const contactMethods = [
    {
      id: "email",
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "bottupallysainath@gmail.com",
      description: "Drop me a line for project discussions",
      action: "Mail me",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      id: "phone",
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+91 8096149910",
      description: "Let's have a quick conversation",
      action: "Schedule Call",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/20",
    },
    {
      id: "location",
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Asifabad, India",
      description: "Available for remote collaboration",
      action: "View Map",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      id: "timezone",
      icon: <Clock className="w-6 h-6" />,
      title: "Timezone",
      value: "UTC+5:30 (IST)",
      description: "Best time to reach: 9 AM - 6 PM",
      action: "Check Time",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10",
      borderColor: "border-orange-500/20",
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-6 h-6" />,
      url: "https://github.com/SainathTony",
      username: "@sainath",
      description: "Check out my code",
      color: "hover:text-gray-900 dark:hover:text-white",
      bgColor: "hover:bg-gray-100 dark:hover:bg-gray-800",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      url: "https://www.linkedin.com/in/sainath-bottupally-754636156/",
      username: "sainath-bottupally",
      description: "Connect professionally",
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-6 h-6" />,
      url: "https://wa.me/918096149910",
      username: "+91 8096149910",
      description: "Text me for quick responses",
      color: "hover:text-sky-500",
      bgColor: "hover:bg-sky-50 dark:hover:bg-sky-900/20",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Contact cards animation
      const cards = gsap.utils.toArray<HTMLDivElement>(".contact-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 80,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Form animation
      gsap.fromTo(
        ".contact-form",
        {
          x: 100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      // Social links animation
      gsap.utils.toArray(".social-link").forEach((link, index) => {
        gsap.fromTo(
          link,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 1 + index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: link,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("bottupallysainath@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const handleContactAction = (methodId: string) => {
    switch (methodId) {
      case "email":
        window.open(
          "mailto:bottupallysainath@gmail.com?subject=Project Discussion&body=Hi Sainath,%0D%0A%0D%0AI would like to discuss a project with you.",
        );
        break;
      case "phone":
        window.open("tel:+918096149910");
        break;
      case "location":
        window.open(
          "https://www.google.com/maps/place/88MX%2BXFC,+Rajiv+Rahadari,+Rahapalle,+Telangana+504293/@19.3347802,79.3486707,170m/data=!3m1!1e3!4m15!1m8!3m7!1s0x3bcb99daeaebd2c7:0xae93b78392bafbc2!2sHyderabad,+Telangana!3b1!8m2!3d17.406498!4d78.4772439!16zL20vMDljNnc!3m5!1s0x3bd2ab6e453aec95:0xc16cc5c1f346c705!8m2!3d19.3349577!4d79.3486129!16s%2Fg%2F11nng7jhg1?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D",
          "_blank",
        );
        break;
      case "timezone":
        window.open(
          "https://www.timeanddate.com/worldclock/india/hyderabad",
          "_blank",
        );
        break;
      default:
        break;
    }
  };

  return (
    <Section
      ref={sectionRef}
      id="contact"
      className="section section-5 bg-gradient-to-br from-rose-50/30 via-white to-indigo-50/20 dark:from-rose-900/10 dark:via-gray-900 dark:to-indigo-900/10"
    >
      <div className="form-container">
        <div className="w-full max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-rose-500/10 to-indigo-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 mb-4">
                Let's Connect
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Start Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600">
                  Journey
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed"
            >
              Ready to bring your ideas to life? Let's collaborate and create
              <span className="text-rose-600 dark:text-rose-400 font-medium">
                {" "}
                something extraordinary
              </span>{" "}
              together.
            </motion.p>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center mt-10">
                Get In Touch
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Whether you have a project in mind, want to discuss
                opportunities, or just want to say hello, I'd love to hear from
                you!
              </p>
            </motion.div>
          </div>

          {/* Main Content Grid */}

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="contact-card group relative"
                  onMouseEnter={() => setActiveContact(method.id)}
                  onMouseLeave={() => setActiveContact(null)}
                >
                  <div
                    className={`relative p-6 rounded-2xl bg-gradient-to-r ${method.bgGradient} backdrop-blur-sm border ${method.borderColor} hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${method.gradient} p-3 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {method.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                          {method.description}
                        </p>
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {method.value}
                          </span>
                          {method.id === "email" && (
                            <button
                              onClick={copyEmail}
                              className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                              title="Copy email"
                            >
                              <Copy className="w-4 h-4 text-gray-500" />
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="hidden sm:block">
                        <button
                          onClick={() => handleContactAction(method.id)}
                          className={`px-4 py-2 rounded-xl bg-gradient-to-r ${method.gradient} text-white font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                        >
                          {method.action}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Copy Email Success */}
            <AnimatePresence>
              {copiedEmail && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed top-4 right-4 z-50 p-4 rounded-xl bg-green-500 text-white font-medium shadow-lg flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Email copied to clipboard!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Connect on Social Media
            </h3>

            <div className="flex flex-wrap justify-center gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-link group relative p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 ${social.bgColor} transition-all duration-300 hover:shadow-xl`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-center">
                    <div
                      className={`text-gray-600 dark:text-gray-400 ${social.color} transition-colors duration-300 mb-3 flex justify-center`}
                    >
                      {social.icon}
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                      {social.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {social.username}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {social.description}
                    </p>
                  </div>

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-center"
          >
            <div className="relative max-w-4xl mx-auto p-8 md:p-12 rounded-3xl bg-gradient-to-br from-rose-500/10 via-purple-500/10 to-indigo-500/10 border border-white/20 dark:border-gray-700/50 backdrop-blur-sm">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-500/5 to-indigo-500/5 blur-xl"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <Coffee className="w-8 h-8 text-rose-500" />
                  <Heart className="w-6 h-6 text-red-500" />
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Let's Create Something{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-indigo-600">
                    Amazing
                  </span>
                </h3>

                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
                  Ready to turn your vision into reality? I'm here to help you
                  build innovative solutions that make a difference.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    className="px-8 py-4 bg-gradient-to-r from-rose-600 to-indigo-600 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Back to Top
                  </motion.button>

                  <motion.button
                    className="px-8 py-4 bg-white/30 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 font-semibold rounded-2xl hover:bg-white/40 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyEmail}
                  >
                    Copy Email
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;
