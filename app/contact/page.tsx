"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  const contactMethods = [
    {
      title: "Email",
      subtitle: "deepakkadian581@gmail.com",
      icon: "📧",
      href: "mailto:deepakkadian581@gmail.com",
    },
    {
      title: "LinkedIn",
      subtitle: "/in/deepak-5a1749238/",
      icon: "💼",
      href: "https://www.linkedin.com/in/deepak-5a1749238/",
    },
    {
      title: "GitHub",
      subtitle: "@dkadian",
      icon: "🐙",
      href: "https://github.com/dkadian",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Using Formspree for easy, serverless direct mail handling
      const response = await fetch("https://formspree.io/f/xvgzgekb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground pt-24 bg-dots">
      <section className="flex-grow py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 text-center animate-fadeIn">
            <h2 className="text-3xl lg:text-5xl font-bold font-mono mb-4">
              <span className="text-syntax-keyword">ping</span> -c 1 deepak
            </h2>
            <p className="text-muted font-mono italic">{"// Establish a secure connection"}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column: Direct Mail Form */}
            <div className="terminal-window animate-slideInLeft hover:shadow-glow-sm transition-all duration-500 hover:-translate-y-1">
              <div className="terminal-header">
                <div className="flex gap-1.5">
                  <div className="terminal-dot bg-[#ff5f56]"></div>
                  <div className="terminal-dot bg-[#ffbd2e]"></div>
                  <div className="terminal-dot bg-[#27c93f]"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted font-mono italic">send_packet.sh</span>
                </div>
              </div>
              
              <div className="terminal-body p-6">
                <form onSubmit={handleSubmit} className="space-y-4 font-mono">
                  <div>
                    <label className="block text-syntax-number text-xs mb-1">NAME</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Input name..."
                      className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:border-syntax-number outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-syntax-number text-xs mb-1">EMAIL</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="user@host.com"
                      className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:border-syntax-number outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-syntax-number text-xs mb-1">SUBJECT</label>
                    <input
                      required
                      type="text"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="Request subject..."
                      className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:border-syntax-number outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-syntax-number text-xs mb-1">MESSAGE</label>
                    <textarea
                      required
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Enter data payload..."
                      className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:border-syntax-number outline-none transition-colors resize-none"
                    />
                  </div>
                  
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className={`w-full py-3 rounded font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      isSubmitting 
                        ? "bg-card text-muted cursor-not-allowed" 
                        : "bg-accent hover:opacity-90 text-white shadow-[0_0_15px_rgba(35,134,54,0.3)]"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 animate-pulse">
                        &gt; SENDING_PACKET...
                      </span>
                    ) : (
                      <span>&gt; EXECUTE_SEND</span>
                    )}
                  </button>

                  <AnimatePresence>
                    {submitStatus === "success" && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-accent/10 border border-accent rounded text-accent text-xs text-center"
                      >
                        [SUCCESS] Data payload delivered successfully.
                      </motion.div>
                    )}
                    {submitStatus === "error" && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-syntax-keyword/10 border border-syntax-keyword rounded text-syntax-keyword text-xs text-center"
                      >
                        [ERROR] Failed to establish handshake. Try again.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>

            {/* Right Column: Existing Methods */}
            <div className="terminal-window animate-terminal">
              <div className="terminal-header">
                <div className="flex gap-1.5">
                  <div className="terminal-dot bg-[#ff5f56]"></div>
                  <div className="terminal-dot bg-[#ffbd2e]"></div>
                  <div className="terminal-dot bg-[#27c93f]"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted font-mono italic">connection_manager.py</span>
                </div>
              </div>
              
              <div className="terminal-body p-8">
                <div className="space-y-8">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="group animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center gap-6">
                        <span className="text-3xl group-hover:scale-125 transition-transform">{method.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-syntax-keyword font-mono text-sm">connect_to</span>
                            <span className="text-foreground font-mono font-bold">(&quot;{method.title}&quot;)</span>
                          </div>
                          <a 
                            href={method.href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-syntax-number font-mono text-sm hover:underline hover:text-syntax-function"
                          >
                            &gt; {method.subtitle}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-8 border-t border-border mt-8">
                    <p className="text-muted font-mono text-sm mb-4 italic">
                      {"// Alternative communication protocols detected..."}
                    </p>
                    <div className="w-full bg-background border border-border rounded p-4 font-mono text-xs text-muted space-y-2">
                      <p><span className="text-accent">$</span> uptime: 24/7</p>
                      <p><span className="text-accent">$</span> response_time: &lt; 24h</p>
                      <p><span className="text-accent">$</span> current_status: <span className="text-syntax-string">Listening_for_opportunities</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
