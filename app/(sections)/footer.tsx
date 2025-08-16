"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { paragraph } from "../font";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SmoothMarquee from "../(components)/smooth-marque";
import Messages from "./messages";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Database } from "../type";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

function Footer({
  guest,
}: {
  guest: Database["public"]["Tables"]["guests"]["Row"] | null;
}) {
  const [loading, setLoading] = useState(false);
  const [wish, setWish] = useState({
    guest: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    if (wish.message.trim() === "" || wish.guest.trim() === "") {
      alert("Pesan dan nama tamu tidak boleh kosong");
      e.preventDefault();
      return;
    }

    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.from("wishes").insert({
      wish: wish.message,
      guest: wish.guest,
    });

    setLoading(false);
    if (error) {
      toast.error("Gagal mengirim pesan: " + error.message);
      return;
    }

    setWish({ guest: "", message: "" });
  };

  const presence = async (isPresence: boolean) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("guests")
      .update({
        is_present: isPresence,
      })
      .eq("id", guest?.id);

    if (error) {
      toast.error("Gagal mengupdate kehadiran: " + error.message);
      return;
    }

    toast.success("Kehadiran berhasil diupdate");
  };

  return (
    <div
      className="relative min-h-screen"
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
          <div className="p-8 w-full flex flex-col max-w-2xl">
            {guest && (
              <>
                <div className="w-full flex justify-between mb-4">
                  <h2
                    className={`${paragraph.className} text-2xl text-lime-900`}
                  >
                    Konfirmasi Kehadiran
                  </h2>
                  <p className={`${paragraph.className} text-lime-900 p-0 m-0`}>
                    {guest.name}
                  </p>
                </div>
                <div className="flex gap-2 w-full mb-12">
                  <Button
                    className="w-full text-lime-900"
                    variant={"outline"}
                    onClick={() => presence(false)}
                  >
                    Tidak Hadir
                  </Button>
                  <Button
                    className="w-full bg-lime-900 text-white"
                    onClick={() => presence(true)}
                  >
                    Hadir
                  </Button>
                </div>
                <Separator className="mt-4 mb-16 border-gray-300 border-[1px]" />
              </>
            )}
            <div className="mb-4 w-full">
              <h2
                className={`${paragraph.className} text-2xl mb-4 text-right text-lime-900`}
              >
                Tinggalkan Pesan untuk Mempelai
              </h2>
              <Input
                placeholder="Nama Anda"
                className="border bg-amber-50 border-gray-300 p-2 w-full mt-4"
                value={wish.guest}
                onChange={(e) => setWish({ ...wish, guest: e.target.value })}
              />
              <Textarea
                id="message"
                className="border bg-amber-50 border-gray-300 p-2 w-full mt-4"
                placeholder="Tinggalkan pesan untuk mempelai"
                rows={4}
                required
                value={wish.message}
                onChange={(e) => setWish({ ...wish, message: e.target.value })}
              ></Textarea>
            </div>
            <Button
              onClick={handleSubmit}
              className="bg-lime-900 text-white"
              disabled={loading}
            >
              Kirim
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="text-lime-900 bg-transparent mt-4"
                  variant={"ghost"}
                >
                  Lihat Pesan
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-2xl">
                <Messages />
              </DialogContent>
            </Dialog>
          </div>
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
