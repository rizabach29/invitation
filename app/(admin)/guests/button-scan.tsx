import { QrCodeIcon } from "lucide-react";
import React from "react";

function ButtonScan() {
  return (
    <div className="fixed bottom-0 right-0 m-8 bg-black rounded-full p-4 text-white hover:bg-gray-800 transition-colors flex flex-col items-center justify-center cursor-pointer">
      <QrCodeIcon size={50} />
      <p className="p-0 text-center">Scan</p>
    </div>
  );
}

export default ButtonScan;
