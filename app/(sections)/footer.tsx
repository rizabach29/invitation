"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { paragraph } from "../font";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Messages from "./messages";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Database } from "../type";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Footer({
  guest,
}: {
  guest: Database["public"]["Tables"]["guests"]["Row"] | null;
}) {
  const [loading, setLoading] = useState(false);
  const [presence, setPresence] = useState(false);
  const [guestNumAttd, setGuestNumAttd] = useState<string | undefined>("0");
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

  const handlePresence = async (isPresence: boolean) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("guests")
      .update({
        is_present: isPresence,
        guest_num_attd: isPresence ? Number(guestNumAttd) : 0,
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
      className="relative min-h-screen w-full"
      // style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      {/* create rsvp form */}
      <motion.div
        className=" min-h-screen w-full max-w-xl bg-[#fef3c7] flex flex-col justify-center items-center rounded-tr-3xl rounded-bl-3xl rounded-tl-full rounded-br-full"
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full flex justify-center items-center h-full max-w-xl">
          <div className="p-8 w-full flex flex-col max-w-xl">
            {guest && (
              <>
                <div className="w-full flex justify-between mb-4">
                  <h2
                    className={`${paragraph.className} text-2xl text-[#BB543B]`}
                  >
                    Konfirmasi Kehadiran
                  </h2>
                  <p
                    className={`${paragraph.className} text-[#BB543B] p-0 m-0`}
                  >
                    {guest.name}
                  </p>
                </div>
                <div className="w-full mb-12">
                  <div className="flex gap-2 w-full">
                    <Button
                      className={`w-full text-[#BB543B] border-[#BB543B] ${
                        !presence ? "border-2 font-bold" : "border-0"
                      } `}
                      variant={"outline"}
                      onClick={() => setPresence(false)}
                    >
                      {!presence && <CheckCircle />}
                      Tidak Hadir
                    </Button>
                    <Button
                      className={`w-full text-[#BB543B] border-[#BB543B] ${
                        presence ? "border-2 font-bold" : "border-0"
                      } `}
                      variant={"outline"}
                      onClick={() => setPresence(true)}
                    >
                      {presence && <CheckCircle />}
                      Hadir
                    </Button>
                  </div>
                  {presence ? (
                    <Select
                      value={guestNumAttd}
                      onValueChange={setGuestNumAttd}
                    >
                      <SelectTrigger className="w-full bg-white mt-2">
                        <SelectValue placeholder="Pilih banyak orang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="1">1 Orang</SelectItem>
                          <SelectItem value="2">2 Orang</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : null}
                  <Button
                    className="bg-[#BB543B] text-white w-full mt-4"
                    onClick={() => handlePresence(presence)}
                  >
                    Kirim
                  </Button>
                </div>
                <Separator className="mt-4 mb-16 border-[#BB543B] border-[1px]" />
              </>
            )}
            <div className="mb-4 w-full">
              <h2
                className={`${paragraph.className} text-2xl mb-4 text-right text-[#BB543B]`}
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
              className="bg-[#BB543B] text-white"
              disabled={loading}
            >
              Kirim
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="text-[#BB543B] bg-transparent mt-4"
                  variant={"ghost"}
                >
                  Lihat Pesan
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-xl">
                <Messages />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Footer;
