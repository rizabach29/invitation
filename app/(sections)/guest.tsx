"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database } from "../type";

function Guest({
  guest,
}: {
  guest: Database["public"]["Tables"]["guests"]["Row"] | null;
}) {
  if (!guest) return null;
  return (
    <motion.div className="w-full max-w-xl flex justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-right text-[#BC533B] bg-amber-50 pt-2 pb-3 px-8 rounded-full"
      >
        <motion.p
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1, delay: 0.07 }}
          className="text-xs"
        >
          Mengundang Bapak/Ibu
        </motion.p>
        <motion.h3
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1, delay: 0.025 }}
          className="mt-2 font-bold text-sm"
        >
          {guest.name}
        </motion.h3>
      </motion.div>
    </motion.div>
  );
}

export default Guest;
