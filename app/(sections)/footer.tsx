import React from "react";
import { motion } from "framer-motion";
import { heading } from "../font";

function Footer() {
  return (
    <div
      className="relative h-screen"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      {/* create rsvp form */}
      <motion.div
        className="fixed bottom-0 h-screen w-full bg-stone-200 flex flex-col justify-end"
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3
          className={`${heading.className} text-7xl text-[#0003] font-bold p-0 m-0`}
        >
          Terima Kasih
        </h3>
      </motion.div>
    </div>
  );
}

export default Footer;
