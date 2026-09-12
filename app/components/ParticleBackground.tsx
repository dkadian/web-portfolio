"use client";

import { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Star {
      x: number;
      y: number;
      size: number;
      baseOpacity: number;
      twinkleSpeed: number;
      phase: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.2 + 0.1;
        this.baseOpacity = Math.random() * 0.5 + 0.1;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        this.phase += this.twinkleSpeed;
      }

      draw() {
        if (!ctx) return;
        const opacity = this.baseOpacity + Math.sin(this.phase) * 0.15;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, opacity)})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      stars = [];
      // Reduce star density for better performance
      const count = Math.floor((window.innerWidth * window.innerHeight) / 12000);
      for (let i = 0; i < count; i++) {
        stars.push(new Star());
      }
    };

    const animate = () => {
      if (!ctx || stars.length === 0) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.update();
        s.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      if (window.innerWidth >= 768) {
        init();
        if (stars.length > 0) animate();
      } else {
        stars = [];
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener("resize", handleResize);
    
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none"
    />
  );
};

export default ParticleBackground;
