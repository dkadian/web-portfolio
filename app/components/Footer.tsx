"use client";

import React from "react";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 lg:py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-xs sm:text-sm order-2 md:order-1">
            © {currentYear} Deepak. All rights reserved.
          </div>
          <div className="order-1 md:order-2">
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

