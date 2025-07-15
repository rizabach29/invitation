"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { QrCodeIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import QRCode from "react-qr-code";

function Qr() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  if (id)
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="fixed bottom-0 right-0 m-8 bg-black rounded-full p-4 text-white hover:bg-gray-800 transition-colors flex flex-col items-center justify-center cursor-pointer">
            <QrCodeIcon size={50} />
          </div>
        </DialogTrigger>
        <DialogContent>
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              bgColor="#fffbeb"
              fgColor="#BC533B"
              value={id}
              viewBox={`0 0 256 256`}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
}

export default Qr;
