import React from "react";
import { motion } from "framer-motion";
import logo from "../../Assets/logo.png";

const Info = () => {
  return (
    <div className="bg-gradient-to-r from-white to-green-400 p-6 md:p-12 flex flex-col md:flex-row items-center" id="aboutus">
      <motion.div
        className="px-12 md:pl-32"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="font-bold text-5xl mb-8 text-black"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Belike AI Portal
        </motion.h1>
        <motion.p
          className="mb-8 text-xl text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Belike AI Portal services involve SEO, social media, PPC advertisng
          <br /> content marketing, and email campaigns.
        </motion.p>
        <motion.ul
          className="m-0 text-md text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.li className="mb-2">
            These strategies aim to bost online visibility engage
          </motion.li>
          <motion.li className="mb-2">
            audiences, and drive business growth by leveraging
          </motion.li>
          <motion.li className="mb-2">
            various online platforms and analytics for optimization.
          </motion.li>
        </motion.ul>
      </motion.div>
      <motion.div className="text-center">
        <motion.img
          className="w-96 h-75 mx-auto rounded-xl"
          src={logo}
          alt="img"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        <motion.span
          className="text-white font-bold text-4xl mt-4 block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Belike AI Portal
        </motion.span>
      </motion.div>
    </div>
  );
};

export default Info;
