import Image from "next/image";

const Footer = () => {
  return (
    <footer className="py-24 border-t border-zinc-900 mt-32 max-w-7xl mx-auto px-6">
      <div className="flex flex-col gap-16">
        {/* Certification & Signature */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-12 border-b border-zinc-900 pb-16">
          <div className="max-w-xl space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-500/50" />
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Certification_Authenticity</span>
            </div>
            <p className="text-zinc-500 text-sm md:text-base font-light italic leading-relaxed">
              &quot;I hereby certify that all technical documentation, project implementations, and academic metrics provided in this portfolio are accurate and an authentic representation of my professional trajectory.&quot;
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Digital_Signature</div>
            <div className="relative w-80 h-32 md:w-[450px] md:h-52 group">
              <Image 
                src="/signature.png" 
                alt="Deepak Kadian Signature" 
                fill
                className="object-contain group-hover:scale-105 transition-all duration-700 -rotate-2"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold text-zinc-600 tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <p>© {new Date().getFullYear()} DEEPAK_KADIAN // ALL_SYSTEMS_AUTHENTICATED.</p>
          </div>
          <div className="flex gap-12">
            {[
              { label: 'GitHub', href: 'https://github.com/dkadian' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/deepak-5a1749238/' },
              { label: 'Email', href: 'mailto:deepakkadian581@gmail.com' }
            ].map((link) => (
              <a key={link.label} href={link.href} target="_blank" className="hover:text-white transition-all duration-500">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
