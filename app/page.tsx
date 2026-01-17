"use client";

import Link from "next/link";
import Image from "next/image";
import Footer from "./components/Footer";
import profileImage from "./Pictures and Certificates/profileImage.jpg";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900/50 via-[#0a0a1e] to-[#0a0a1e] text-white pt-16">

      {/* Home Section */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                <div className="relative w-48 h-48 lg:w-60 lg:h-60 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src={profileImage}
                    alt="Deepak - Profile Photo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Name & About */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                Deepak
              </h1>
              <p className="text-xl lg:text-2xl text-gray-400 mb-8 max-w-2xl">
                Hello! I am currently pursuing a B.Tech in Computer Science and
                Engineering, driven by a deep passion for technology and
                innovation. Growing up with a generational interest in tech, I
                have always been fascinated by how software and emerging
                technologies shape the world.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  href="/projects"
                  className="px-8 py-3 bg-white text-[#0a0a1e] font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  View Projects
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;

