"use client";

import Footer from "../components/Footer";
import { useState } from "react";

const CVPage = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Trigger download
    const link = document.createElement("a");
    link.href = "/Resume.pdf";
    link.download = "Deepak_Kadian_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset downloading state after a short delay
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900/50 via-[#0a0a1e] to-[#0a0a1e] text-white pt-16">
      {/* CV Section */}
      <section className="min-h-screen flex items-center py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 text-center animate-fadeIn">
            My Resume
          </h2>
          <p className="text-base sm:text-xl text-gray-400 mb-8 lg:mb-12 text-center max-w-2xl mx-auto animate-fadeIn stagger-2">
            Download my resume to learn more about my education, skills, projects, and experience.
          </p>

          {/* Download Card */}
          <div className="max-w-md mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-500 animate-fadeIn">
              {/* Document Icon */}
              <div className="flex justify-center mb-6 lg:mb-8">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <svg
                    className="w-10 h-10 lg:w-12 lg:h-12 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* File Info */}
              <div className="text-center mb-6 lg:mb-8">
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">
                  Deepak Kadian
                </h3>
                <p className="text-sm lg:text-base text-gray-500">
                  Resume.pdf • PDF Document
                </p>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`w-full py-3 lg:py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  isDownloading
                    ? "bg-green-500/80 cursor-wait"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                }`}
              >
                {isDownloading ? (
                  <>
                    <svg
                      className="w-5 h-5 lg:w-6 lg:h-6 animate-bounce"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Downloaded!
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 lg:w-6 lg:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download Resume
                  </>
                )}
              </button>

              {/* Note */}
              <p className="text-xs lg:text-sm text-gray-500 text-center mt-4">
                Click to download the PDF file
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CVPage;

