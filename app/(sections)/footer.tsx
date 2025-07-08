import React from "react";
import { motion } from "framer-motion";
import { paragraph } from "../font";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SmoothMarquee from "../(components)/smooth-marque";

function Footer() {
  return (
    <div
      className="relative h-screen"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      {/* create rsvp form */}
      <motion.div
        className="fixed bottom-0 h-screen w-full max-w-2xl bg-stone-200 flex flex-col justify-end items-center"
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full flex justify-center items-center h-full max-w-2xl">
          <form className="p-8 w-full flex flex-col items-end max-w-2xl">
            <h2 className={`${paragraph.className} text-2xl mb-4 text-right`}>
              Konfirmasi Kehadiran
            </h2>
            <div className="flex gap-2 w-full">
              <Button className="w-full" variant={"outline"}>
                Tidak Hadir
              </Button>
              <Button className="w-full">Hadir</Button>
            </div>
            <div className="mb-4 w-full">
              <Textarea
                id="message"
                className="border bg-amber-50 border-gray-300 p-2 w-full mt-12"
                placeholder="Tinggalkan pesan untuk mempelai"
                rows={4}
                required
              ></Textarea>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
        <div
          className={`text-7xl text-center text-[#BB543B] mb-4 uppercase ${paragraph.className}`}
        >
          <SmoothMarquee text="SEPTEMBER CERIA . SEPTEMBER CERIA . " />
        </div>
      </motion.div>
    </div>
  );
}

export default Footer;
