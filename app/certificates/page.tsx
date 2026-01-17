"use client";

import Footer from "../components/Footer";

const CertificatesPage = () => {
  const certificates = [
    {
      name: "Certificate 1",
      issuer: "Issuer Name",
      date: "2024",
      link: "#",
    },
    {
      name: "Certificate 2",
      issuer: "Issuer Name",
      date: "2024",
      link: "#",
    },
    {
      name: "Certificate 3",
      issuer: "Issuer Name",
      date: "2023",
      link: "#",
    },
  ];

  return (
<div className="min-h-screen bg-gradient-to-b from-indigo-900/50 via-[#0a0a1e] to-[#0a0a1e] text-white pt-16">
      {/* Certificates Section */}
      <section className="min-h-screen flex items-center py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
            Certificates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {cert.name}
                </h3>
                <p className="text-gray-400 mb-1">{cert.issuer}</p>
                <p className="text-gray-500 text-sm mb-4">{cert.date}</p>
                <a
                  href={cert.link}
                  className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
                >
                  Verify Certificate →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CertificatesPage;

