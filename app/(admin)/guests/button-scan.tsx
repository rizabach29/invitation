import { QrCodeIcon } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Scanner } from "@yudiel/react-qr-scanner";

function ButtonScan() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="fixed bottom-0 right-0 m-8 bg-black rounded-full p-4 text-white hover:bg-gray-800 transition-colors flex flex-col items-center justify-center cursor-pointer">
            <QrCodeIcon size={50} />
            <p className="p-0 text-center">Scan</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan QR Undangan</DialogTitle>
            <DialogDescription>
              <div className="gap-2 mt-4">
                <Scanner
                  styles={{
                    container: { width: "20rem", height: "20rem" },
                    video: { width: "20rem", height: "20rem" },
                  }}
                  onScan={(result) => console.log(result)}
                />

                <p>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ButtonScan;
