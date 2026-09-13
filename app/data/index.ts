export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  stats: string;
  images?: string[];
  isModelOnly?: boolean;
  backTitle?: string;
  backDescription?: string;
  backIcon?: string;
}


export const projects = [
  {
    title: "Lok Drishti : Sovereign Political Intelligence",
    description: "Built a React 19 interface with interactive SVG election mapping and a constitutional quiz engine. Created a JWT-secured admin console with a database staging pipeline to safely propose and review system updates. Integrated ChromaDB and embeddings to enable semantic search queries over national legislative directories.",
    tech: ["React 19", "SVG Mapping", "JWT Security", "ChromaDB", "Embeddings", "Semantic Search", "SQL/Staging"],
    link: "https://github.com/dkadian/lok-drishti",
    stats: "June 2026",
    images: [
      "/project-images/lok-drishti/1.png",
      "/project-images/lok-drishti/2.png",
      "/project-images/lok-drishti/3.png",
      "/project-images/lok-drishti/4.png",
      "/project-images/lok-drishti/5.png",
      "/project-images/lok-drishti/6.png"
    ],
    backDescription: "Lok Drishti is a production-grade political intelligence framework integrating React 19 interactive SVG mapping, JWT admin console, database staging pipelines, and semantic ChromaDB search.",
    backIcon: "🏛️"
  },
  {
    title: "PathFinder : GenAI Career Guidance Assistant",
    description: "A career counseling platform with a React frontend and FastAPI backend, utilizing aiosqlite for database operations to persist user profiles, sessions, and chat histories. Built a document-processing pipeline using pdfplumber, PyMuPDF, and Tesseract OCR to extract resume text, LLM extraction to automatically populate user profiles. Integrated cloud and local models—specifically Llama-3.1, LM Studio, and a local T5-Large model implementing real-time response streaming and strict content guardrails.",
    tech: ["React", "FastAPI", "Llama 3.1", "LM Studio", "T5-Large", "aiosqlite", "pdfplumber", "PyMuPDF", "Tesseract OCR"],
    link: "https://github.com/dkadian/career-assistant",
    stats: "May 2026",
    images: [
      "/project-images/pathfinder/1.png",
      "/project-images/pathfinder/2.png",
      "/project-images/pathfinder/3.png"
    ]
  },
  {
    title: "Hand Gesture Recognition",
    description: "Trained CNN model for gesture recognition with image augmentation to reduce overfitting. Optimized hyperparameters to achieve high accuracy for sign language applications. Experimented with the hyperparameters to improve the accuracy and model performance.",
    tech: ["Python", "Deep Learning", "TensorFlow", "OpenCV", "CNN"],
    link: "https://github.com/dkadian/Hand_gesture_recog.",
    stats: "January 2026",
    isModelOnly: true
  },
  {
    title: "Portfolio Website",
    description: "Built a modern React/TypeScript site with Tailwind CSS and App Router architecture. Implemented interactive transitions and clean layouts to showcase projects, skills, education, and contact channels.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/dkadian/web-portfolio",
    stats: "November 2025",
    images: [
      "/project-images/web-portfolio/1.png",
      "/project-images/web-portfolio/2.png",
      "/project-images/web-portfolio/3.png"
    ]
  },
  {
    title: "SVM Based Dog and Cat Recognition",
    description: "Built an SVM image classifier for cat/dog distinction using Kaggle datasets. Developed an end-to-end Python pipeline including preprocessing and feature scaling. Designed end-to-end machine learning pipeline for image classification.",
    tech: ["Python", "SVM", "Scikit-Learn", "OpenCV", "Image Processing"],
    link: "https://github.com/dkadian/Dogs_cats_recog",
    stats: "June 2025",
    images: [
      "/project-images/dogs-cats/1.png",
      "/project-images/dogs-cats/2.png",
      "/project-images/dogs-cats/3.png"
    ]
  }
];

export const skillsData = [
  {
    category: "Web Development",
    skills: [
      { name: "React.js", level: 65 },
      { name: "JavaScript", level: 75 },
      { name: "HTML", level: 80 },
      { name: "CSS", level: 80 }
    ]
  },
  {
    category: "Backend & Databases",
    skills: [
      { name: "Python", level: 90 },
      { name: "FastAPI", level: 70 },
      { name: "Flask", level: 75 },
      { name: "Streamlit", level: 75 },
      { name: "MySQL", level: 78 },
      { name: "MongoDB", level: 78 },
      { name: "SQLite", level: 60 }
    ]
  },
  {
    category: "Data Science",
    skills: [
      { name: "Pandas", level: 85 },
      { name: "NumPy", level: 85 },
      { name: "Scikit-learn", level: 80 },
      { name: "Matplotlib", level: 78 },
      { name: "OpenCV", level: 75 }
    ]
  },
  {
    category: "Deep Learning",
    skills: [
      { name: "TensorFlow", level: 75 },
      { name: "Neural Networks", level: 80 },
      { name: "CNN", level: 80 },
      { name: "RNN & LSTM & GRU", level: 75 }
    ]
  },
  {
    category: "Generative AI",
    skills: [
      { name: "LangChain", level: 82 },
      { name: "Hugging Face Transformers", level: 78 },
      { name: "Ollama", level: 78 },
      { name: "Embeddings", level: 80 },
      { name: "ChromaDB", level: 80 },
      { name: "FAISS", level: 75 }
    ]
  },
  {
    category: "AI Models & APIs",
    skills: [
      { name: "OpenAI API", level: 67 },
      { name: "Gemini API", level: 66 },
      { name: "Claude API", level: 68 },
      { name: "Groq API", level: 65 }
    ]
  },
  {
    category: "AI Development Tools",
    skills: [
      { name: "ChatGPT", level: 73 },
      { name: "Claude Code", level: 71 },
      { name: "Gemini CLI", level: 72 },
      { name: "OpenAI Codex CLI", level: 70 },
      { name: "Cursor", level: 74 },
      { name: "VS Code", level: 73 },
      { name: "Antigravity IDE", level: 74 },
      { name: "Antigravity CLI", level: 71 }
    ]
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 85 },
      { name: "Jupyter Notebook", level: 80 },
      { name: "Power BI", level: 75 },
      { name: "n8n", level: 70 }
    ]
  }
];
export const completedSGPAs = [
  { semester: "Semester 01", sgpa: 8.286 },
  { semester: "Semester 02", sgpa: 7.500 },
  { semester: "Semester 03", sgpa: 8.900 },
  { semester: "Semester 04", sgpa: 8.526 },
  { semester: "Semester 05", sgpa: 8.391 },
  { semester: "Semester 06", sgpa: 7.957 },
  { semester: "Semester 07", sgpa: null },
  { semester: "Semester 08", sgpa: null }
];


const validSGPAs = completedSGPAs.filter(s => typeof s.sgpa === 'number' && s.sgpa !== null);
export const cgpa = (validSGPAs.reduce((acc, curr) => acc + (curr.sgpa as number), 0) / validSGPAs.length).toFixed(2);

export const experienceData = [
  {
    role: "AI for Sustainability Virtual Internship",
    company: "1M1B",
    location: "Remote",
    duration: "July 2026 – Present",
    description: "Designed and prototyped AI-powered sustainability solutions, applying IBM Granite models and RAG frameworks to address climate action and waste reduction. Explored agentic AI systems for clean energy initiatives, gaining hands-on experience with cutting-edge AI/ML concepts under expert mentorship from IBM Labs professionals."
  },
  {
    role: "Financial Analyst Intern",
    company: "Edify Equity",
    location: "Remote",
    duration: "June 2026 – July 2026",
    description: "Conducted comprehensive market research, analyzing company fundamentals and macroeconomic indicators to identify key stock market trends. Generated weekly reports summarizing notable stock performance and critical financial news, contributing to 10+ internal review presentations for senior leadership."
  }
];

export const certificationsData = [
  {
    title: "Agentic AI Certified Foundations Associate",
    issuer: "Oracle",
    date: "September 2026",
    image: "/certificates/oracle.jpg",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=94FF7F9CAEBC4206252262F5C48534A40835B7A7CC65EE3C89882E04A176E02C"
  },
  {
    title: "AI Literacy",
    issuer: "IBM",
    date: "July 2026",
    image: "/certificates/ailiteracy.jpg",
    url: "https://www.credly.com/badges/8c46c5b6-d197-4029-a85e-c0cede782521/linked_in_profile"
  },
  {
    title: "Complete Data Science, Machine Learning, DL, NLP Bootcamp",
    issuer: "Udemy",
    date: "April 2026",
    image: "/certificates/udemy.jpg",
    url: "https://ude.my/UC-56952136-48ad-43f6-9a48-45030942d575"
  }
];

// --- Sections ---

