"use client";

import Logo from "@/app/sources/Logo";
import React from "react";
import TableGuest from "./table";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { paragraph } from "@/app/font";
import { createClient } from "@/utils/supabase/client";
import CustomGuest from "./custom-guest";

function Page() {
  const onScan = async (result: IDetectedBarcode[]) => {
    console.log("Scanned Data:", result);
    if (result.length > 0) {
      const scannedData = result[0].rawValue;
      console.log("Scanned Data:", scannedData);

      const supabase = createClient();

      const { data: updatedUser, error } = await supabase
        .from("guests")
        .update({
          is_present: true,
          presence_at: new Date(),
        })
        .eq("id", scannedData);

      if (error) {
        console.error("Update failed:", error.message);
      }

      console.log("Updated User:", updatedUser);

      // Here you can handle the scanned data, e.g., send it to your server or process it
    } else {
      console.log("No QR code detected");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div className="w-auto py-4">
          <Logo color="#000000" />
        </div>
      </div>
      <div className="flex justify-center w-full gap-4">
        <div>
          <CustomGuest />
          <TableGuest />
        </div>
        <div
          className={`bg-white p-4 rounded-lg shadow-md max-w-md w-auto ${paragraph.className}`}
        >
          <p className={` text-lg`}>Scan QR Undangan</p>
          <div className="gap-2 mt-4">
            <Scanner
              styles={{
                container: { width: "20rem", height: "20rem" },
                video: { width: "20rem", height: "20rem" },
              }}
              scanDelay={1000}
              allowMultiple
              onScan={onScan}
              onError={(error) => console.error("Scanner Error:", error)}
            />
          </div>
          <div className="mt-8">
            <p className="text-xs">Undangan</p>
            <p className="font-medium text-lg">Muhammad Bachtiar</p>
          </div>
          <div className="mt-8">
            <p className="text-xs">Jumlah Diundangan</p>
            <p className="font-medium text-lg">2</p>
          </div>
          <div className="mt-8">
            <p className="text-xs">Jumlah Hadir</p>
            <p className="font-medium text-lg">1</p>
          </div>
        </div>
      </div>
      {/* <ButtonScan /> */}
    </>
  );
}

export default Page;
