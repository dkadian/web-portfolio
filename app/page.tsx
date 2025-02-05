import React from "react";

const Page = () => {

  return (
    <>
      <div className="text-2xl ml-9 mt-5 text-red-50 lg:text-2xl max-w-fit">
        <h1 className="transition-all p-2 duration-300 hover:bg-rose-50 cursor-pointer rounded-xl hover:text-black text-left">D.K.</h1>
      </div>

      <nav className="font-semibold text-xl text-red-50 m-2 text-center">
        <a className="font-semibold text-xl m-2 text-center">Home</a>
        <a className="font-semibold text-xl m-2 text-center">Projects</a>
        <a className="font-semibold text-xl m-2 text-center">Education</a>
        <a className="font-semibold text-xl m-2 text-center">Certificates</a>
        <a className="font-semibold text-xl m-2 text-center">Skills</a>
      </nav>

      <div className="text-left p-7 ml-10 mt-20 text-opacity-60 text-red-50 text-6xl">
        Deepak
      </div>


      <div className="text-2xl lg:text-2xl">
        <p className="p-10 rounded-base font-thin text-red-50 cursor-pointer">
          Hello! I am currently pursuing a B.Tech in Computer Science and Engineering, driven by a deep passion for technology and innovation. Growing up with a generational interest in tech, I have always been fascinated by how software and emerging technologies shape the world. I enjoy exploring areas like web development, AI, and data structures, constantly looking for opportunities to learn and build impactful solutions. With a strong problem-solving mindset and a curiosity for cutting-edge advancements, I am eager to contribute to the ever-evolving tech landscape.
        </p>
      </div>
    </>
  );
};

export default Page;
