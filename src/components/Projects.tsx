import { useEffect, useState } from "react";
import { assets, projectsData } from "../assets/assets";
import { motion } from "framer-motion";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) {
        setCardsToShow(3); // Show 3 cards on desktop
      } else if (window.innerWidth >= 640) {
        setCardsToShow(2); // Show 2 on tablet
      } else {
        setCardsToShow(1); // 1 on mobile
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const maxIndex = Math.max(projectsData.length - cardsToShow, 0);

  const nextProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < maxIndex ? prevIndex + 1 : maxIndex
    );
  };

  const previousProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden"
      id="Projects"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Projects &nbsp;
        <span className="underline underline-offset-4 decoration-1 font-light">
          Completed
        </span>
      </h1>
      <p className="text-center text-gray-500 mb-8 max-w-80 mx-auto">
        "Shape your future with inspired spaces—dive into our portfolio today!"
      </p>

      {/* Slider Buttons */}
      <div className="flex justify-end items-center mb-8">
        <button
          className={`p-3 rounded mr-2 ${
            currentIndex === 0
              ? "bg-gray-100 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
          onClick={previousProject}
          disabled={currentIndex === 0}
          aria-label="Previous Project"
        >
          <img
            src={assets.leftArrow}
            alt="Previous"
            className="size-6 opacity-70"
          />
        </button>
        <button
          className={`p-3 rounded ${
            currentIndex === maxIndex
              ? "bg-gray-100 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
          onClick={nextProject}
          disabled={currentIndex === maxIndex}
          aria-label="Next Project"
        >
          <img
            src={assets.rightArrow}
            alt="Next"
            className="size-6 opacity-70"
          />
        </button>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(100 / cardsToShow) * currentIndex}%)`,
            width: `${(100 / cardsToShow) * projectsData.length}%`
          }}
        >
          {projectsData.map((project, index) => (
            <div
              key={index}
              className="p-4"
              style={{
                width: `${100 / projectsData.length}%`
              }}
            >
              <div className="relative w-full h-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover mb-14"
                />
                <div className="absolute left-0 right-0 bottom-5 flex justify-center">
                  <div className="inline-block bg-white w-3/4 px-4 py-2 shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {project.title}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {project.price} <span className="px-1">|</span>{" "}
                      {project.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
