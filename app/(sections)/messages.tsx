import { createClient } from "@/utils/supabase/client";
import React, { useEffect } from "react";
import { Database } from "../type";

type TData = Database["public"]["Tables"]["wishes"]["Row"] & {
  guests?: { name: string };
};

function Messages() {
  const [messages, setMessages] = React.useState<TData[]>([]);

  const getMessages = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching guests:", error);
      return;
    }

    console.log("Fetched Messages:", data);
    setMessages(data || []);
  };

  useEffect(() => {
    const channel = createClient()
      .channel("guests")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "wishes" },
        () => getMessages()
      )
      .subscribe();

    getMessages();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-2xl font-bold mb-4 text-[#BB543B]">Pesan Tamu</h2>
        <p className="text-sm text-gray-500 mb-6">
          Pesan-pesan dari tamu yang hadir.
        </p>
      </div>
      <div className="w-full overflow-y-auto max-h-[60vh] px-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="mb-4 px-4 py-3 bg-amber-50/80 rounded-lg w-full text-red-900"
          >
            <p className="text-xs font-semibold mb-2">{message.guest}</p>
            <p>{message.wish}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Messages;
