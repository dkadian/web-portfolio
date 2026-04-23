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
    <div className="min-h-screen flex flex-col bg-background text-foreground pt-24 bg-grid">
      {/* CV Section */}
      <section className="flex-grow py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-3xl lg:text-5xl font-bold font-mono mb-4">
              <span className="text-syntax-keyword">curl</span> -O ./resume.pdf
            </h2>
            <p className="text-muted font-mono italic">{"// Fetch the latest version of my CV"}</p>
          </div>

          <div className="max-w-2xl mx-auto lg:mx-0">
            <div className="terminal-window animate-terminal">
              <div className="terminal-header">
                <div className="flex gap-1.5">
                  <div className="terminal-dot bg-[#ff5f56]"></div>
                  <div className="terminal-dot bg-[#ffbd2e]"></div>
                  <div className="terminal-dot bg-[#27c93f]"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted font-mono italic">wget_manager.sh</span>
                </div>
              </div>
              
              <div className="terminal-body p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* File Icon Visual */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-32 border-2 border-border rounded-sm relative bg-card flex items-center justify-center group overflow-hidden">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-border origin-top-right rotate-45 translate-x-4 -translate-y-4"></div>
                      <span className="text-4xl">📄</span>
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-accent"></div>
                    </div>
                  </div>

                  {/* File Info & Action */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold font-mono text-foreground mb-2">Deepak_Kadian_Resume.pdf</h3>
                      <div className="space-y-1">
                        <p className="text-xs font-mono text-muted">TYPE: APPLICATION/PDF</p>
                        <p className="text-xs font-mono text-muted">SIZE: 1.2 MB</p>
                        <p className="text-xs font-mono text-muted">LAST_MODIFIED: 2024-10-24</p>
                      </div>
                    </div>

                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className={`w-full md:w-auto px-8 py-3 rounded font-mono text-sm transition-all flex items-center justify-center gap-3 ${
                        isDownloading
                          ? "bg-accent/20 text-accent border border-accent cursor-wait"
                          : "bg-accent hover:opacity-90 text-white"
                      }`}
                    >
                      {isDownloading ? (
                        <>
                          <span className="animate-spin text-lg">↻</span>
                          TRANSFERRING...
                        </>
                      ) : (
                        <>
                          <span className="text-lg">⬇</span>
                          ./download_resume.sh
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Progress Bar (Visible only when downloading) */}
                <div className={`mt-8 transition-opacity duration-300 ${isDownloading ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="flex justify-between font-mono text-[10px] text-muted mb-1">
                    <span>1.2MB / 1.2MB</span>
                    <span className="animate-pulse">100% COMPLETE</span>
                  </div>
                  <div className="w-full h-1 bg-background rounded-full overflow-hidden">
                    <div className="bg-accent h-full w-full"></div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs font-mono text-muted leading-relaxed">
                    <span className="text-accent">$</span> md5sum resume.pdf<br />
                    <span className="text-syntax-string">8f9e1c2b3d4e5f6a7b8c9d0e1f2a3b4c</span>
                  </p>
                </div>
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

export default CVPage;
