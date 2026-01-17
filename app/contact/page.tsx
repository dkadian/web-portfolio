"use client";

import Footer from "../components/Footer";

const ContactPage = () => {
  return (
<div className="min-h-screen bg-gradient-to-b from-indigo-900/50 via-[#0a0a1e] to-[#0a0a1e] text-white pt-16">
      {/* Contact Section */}
      <section className="min-h-screen flex items-center py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
            Contact
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl text-gray-400 mb-12">
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a
                href="mailto:your.email@example.com"
                className="flex flex-col items-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-3xl mb-4">📧</span>
                <span className="text-white font-medium">Email</span>
                <span className="text-gray-500 text-sm mt-2">
                  deepakkadian581@gmail.com
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/deepak-5a1749238/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-3xl mb-4">💼</span>
                <span className="text-white font-medium">LinkedIn</span>
                <span className="text-gray-500 text-sm mt-2">
                  Connect with me
                </span>
              </a>
              <a
                href="https://github.com/dkadian"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-3xl mb-4">🐙</span>
                <span className="text-white font-medium">GitHub</span>
                <span className="text-gray-500 text-sm mt-2">
                  View my work
                </span>
              </a>
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

