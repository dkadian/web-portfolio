# Deepak Kadian - Advanced Portfolio Architecture

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

A high-performance, immersive portfolio website built with the latest **Next.js 15 (App Router)** and **React 19**. Designed with a minimalist, hacker-inspired "Dark Mode" aesthetic, this architecture showcases my engineering capabilities, projects, and academic background through highly interactive, Framer Motion-powered interfaces.

**🔗 Live Site**: [*(Add your deployment link here, e.g., deepakkadian.com)*](#)

---

## 🚀 Key Features

- **Component-Driven Architecture**: The monolithic structure was successfully refactored into modular, maintainable UI components (`app/components/sections/`).
- **Interactive Framer Motion UI**: Features custom `TiltCard` components, `Magnetic` hover buttons, and a smooth `ParticleBackground` for an immersive user experience.
- **Secure Custom Backend**: Uses a custom Next.js API route (`/api/contact`) integrated with **Nodemailer** to securely transmit messages directly to my primary email using Google App Passwords.
- **Dynamic Skill Trees**: An infinite-scrolling expertise tracker mapping out core competencies across Web Development, Data Science, and Machine Learning.
- **GitHub Integration**: Direct API connections for live repository data tracking and presentation.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **Backend Email**: [Nodemailer](https://nodemailer.com/)

---

## 📁 System Architecture

```text
web-portfolio/
├── app/
│   ├── api/
│   │   ├── contact/           # Nodemailer secure POST route
│   │   └── github/            # GitHub API integration route
│   ├── components/            
│   │   ├── sections/          # Modularized page sections (Hero, Projects, Experience, etc.)
│   │   ├── ui/                # Shared interactive components (Magnetic, TiltCard, Reveal)
│   │   ├── Navigation.tsx     # Animated glassmorphism top nav & mobile drawer
│   │   └── ParticleBackground.tsx
│   ├── data/                  # Centralized data structures for projects/skills
│   ├── globals.css            # Global theme variables & Tailwind injections
│   ├── layout.tsx             # Root layout & font definitions
│   └── page.tsx               # Primary assembly point
├── public/                    # Static assets (Resume, Signature, Images)
└── tailwind.config.ts         # Tailwind system configurations
```

## 👨‍💻 About The Developer

**Deepak Kadian** | *B.Tech CS Student & AI-ML Engineer* based in Gurugram, IN.
I specialize in building clean, performant, and user-centric applications bridging the gap between Full-Stack Web Development and Data Science.

- **Email**: [deepakkadian581@gmail.com](mailto:deepakkadian581@gmail.com)
- **LinkedIn**: [Deepak Kadian](https://www.linkedin.com/in/deepak-5a1749238/)
- **GitHub**: [@dkadian](https://github.com/dkadian)

---

## ⚙️ Local Deployment

To run this architecture locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dkadian/web-portfolio.git
   cd web-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory for the Contact form to function:
   ```env
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_google_app_password
   ```

4. **Initialize Turbopack Dev Server:**
   ```bash
   npm run dev
   ```
   *Navigate to [http://localhost:3000](http://localhost:3000) to view the application.*

## 📝 License

This project is private and for personal use.

---
*Built with logic, precision, and Next.js by Deepak Kadian // 2026*
