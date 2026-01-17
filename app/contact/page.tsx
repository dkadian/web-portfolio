"use client";

import Footer from "../components/Footer";

const ContactPage = () => {
  const contactMethods = [
    {
      title: "Email",
      subtitle: "deepakkadian581@gmail.com",
      icon: "📧",
      href: "mailto:deepakkadian581@gmail.com",
      color: "hover:bg-purple-500/20",
    },
    {
      title: "LinkedIn",
      subtitle: "Connect with me",
      icon: "💼",
      href: "https://www.linkedin.com/in/deepak-5a1749238/",
      color: "hover:bg-blue-500/20",
    },
    {
      title: "GitHub",
      subtitle: "View my work",
      icon: "🐙",
      href: "https://github.com/dkadian",
      color: "hover:bg-gray-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900/50 via-[#0a0a1e] to-[#0a0a1e] text-white pt-16">
      {/* Contact Section */}
      <section className="min-h-screen flex items-center py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 lg:mb-12 text-center animate-fadeIn">
            Contact
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-base sm:text-xl text-gray-400 mb-8 lg:mb-12 animate-fadeIn stagger-2">
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center p-4 lg:p-6 bg-white/5 border border-white/10 rounded-2xl ${method.color} hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-500 animate-fadeIn min-h-[140px] lg:min-h-[160px]`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <span className="text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300">
                      {method.icon}
                    </span>
                  </div>
                  <span className="text-base lg:text-lg text-white font-medium group-hover:text-purple-300 transition-colors duration-300">
                    {method.title}
                  </span>
                  <span className="text-xs lg:text-sm text-gray-500 mt-2 group-hover:text-gray-400 transition-colors duration-300">
                    {method.subtitle}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;

