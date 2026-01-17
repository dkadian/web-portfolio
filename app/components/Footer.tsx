"use client";

import React from "react";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-gray-500 text-sm">
            © {currentYear} Deepak. All rights reserved.
          </div>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

