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
      action: "Send Email",
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
      value: "Hyderabad, India",
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
      url: "https://github.com/sainath",
      username: "@sainath",
      description: "Check out my code",
      color: "hover:text-gray-900 dark:hover:text-white",
      bgColor: "hover:bg-gray-100 dark:hover:bg-gray-800",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      url: "https://linkedin.com/in/sainath-bottupally",
      username: "sainath-bottupally",
      description: "Connect professionally",
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-6 h-6" />,
      url: "https://twitter.com/sainath",
      username: "@sainath",
      description: "Follow for updates",
      color: "hover:text-sky-500",
      bgColor: "hover:bg-sky-50 dark:hover:bg-sky-900/20",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Contact cards animation
      gsap.utils.toArray(".contact-card").forEach((card, index) => {
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

  return (
    <Section
      ref={sectionRef}
      id="contact"
      className="section section-5 py-20 bg-gradient-to-br from-rose-50/30 via-white to-indigo-50/20 dark:from-rose-900/10 dark:via-gray-900 dark:to-indigo-900/10"
    >
      <div className="form-container">
        <div className="w-full max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
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

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Get In Touch
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Whether you have a project in mind, want to discuss
                  opportunities, or just want to say hello, I'd love to hear
                  from you!
                </p>
              </motion.div>

              {/* Contact Methods */}
              <div className="grid gap-6">
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
                            className={`px-4 py-2 rounded-xl bg-gradient-to-r ${method.gradient} text-white font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                          >
                            {method.action}
                          </button>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <AnimatePresence>
                        {activeContact === method.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${method.gradient} opacity-5 pointer-events-none`}
                          />
                        )}
                      </AnimatePresence>
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

            {/* Contact Form */}
            <div className="contact-form">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-xl"
              >
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Send a Message
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Let's discuss your project and how we can work together
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Message Sent!
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Thank you for reaching out. I'll get back to you within
                        24 hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-3 bg-gradient-to-r from-rose-600 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                          placeholder="Project discussion, collaboration, etc."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="Tell me about your project, ideas, or how we can collaborate..."
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-8 py-4 bg-gradient-to-r from-rose-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <Send className="w-5 h-5" />
                            <span>Send Message</span>
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 text-center"
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
                  className={`social-link group relative p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 ${social.bgColor} transition-all duration-300 hover:shadow-xl`}
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
            className="mt-20 text-center"
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
                    className="px-8 py-4 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 font-semibold rounded-2xl hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300"
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
