"use client";

import React, { useState, useEffect } from "react";

const TechMetadata = () => {
  const [stats, setStats] = useState({
    time: "",
    uptime: "0s",
    status: "STABLE",
    latency: "24ms"
  });

  useEffect(() => {
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const now = new Date();
      const uptimeSec = Math.floor((Date.now() - startTime) / 1000);
      
      setStats({
        time: now.toLocaleTimeString([], { hour12: false }),
        uptime: `${uptimeSec}s`,
        status: "STABLE",
        latency: `${Math.floor(Math.random() * 10) + 20}ms`
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] text-muted/60 uppercase tracking-widest border-t border-border/50 pt-4 mt-4 w-full">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
        <span>Status: <span className="text-accent">{stats.status}</span></span>
      </div>
      <div>Uptime: {stats.uptime}</div>
      <div>Latency: {stats.latency}</div>
      <div>Environment: <span className="text-syntax-keyword">Production</span></div>
      <div>Version: <span className="text-syntax-number">1.2.0-stable</span></div>
      <div className="ml-auto">{stats.time}</div>
    </div>
  );
};

export default TechMetadata;
