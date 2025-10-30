import React from "react";
import HeroSlider from "../components/HeroSlider";
import CallToAction from "../components/CallToAction";
import About from "../components/About";
import Status from "../components/Status";
import Departments from "../components/Departments";
import Doctors from "../components/Doctors";
import { motion } from "framer-motion";

function Home() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden"
    >
      <HeroSlider />

      <motion.div variants={sectionVariants}>
        <CallToAction />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <About />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <Status />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <Departments />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <Doctors />
      </motion.div>
    </motion.div>
  );
}

export default Home;
