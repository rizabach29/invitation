import { Database } from "@/app/type";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect } from "react";

function CustomGuest() {
  const [data, setData] = React.useState<
    Database["public"]["Tables"]["guests"]["Row"][]
  >([]);

  const getGuest = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .filter("presence_at", "is", null)
      .order("presence_at", { ascending: false });

    if (error) {
      console.error("Error fetching guests:", error);
      setData([]);
      return;
    }

    setData(data || []);
    return;
  };

  useEffect(() => {
    getGuest();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className="mb-2">
          Tambah Kehadiran
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Kehadiran Tamu</DialogTitle>
          <DialogDescription>
            Menu untuk menambahkan kehadiran tamu secara manual.
          </DialogDescription>
          <div className="mt-2">
            <Combobox
              data={data.map((item) => ({ value: item.id, label: item.name }))}
              onChange={(item) => console.log(item)}
              placeholder="Cari Tamu..."
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CustomGuest;
