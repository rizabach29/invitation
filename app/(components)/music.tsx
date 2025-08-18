"use client";

import { SpeakerLoudIcon, SpeakerOffIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";

const useAudio = (url: string) => {
  const [audio, setAuido] = useState<HTMLAudioElement>();
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuido(new Audio(url));
    }
  }, []);

  useEffect(() => {
    if (audio) {
      if (playing) audio.play();
      else audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", () => {
        audio.currentTime = 0;
        audio.play();
        setPlaying(true);
      });
    }
  }, [audio]);

  return { playing, toggle };
};

const Player = ({ url }: { url: string }) => {
  const { playing, toggle } = useAudio(url);

  return (
    <div>
      <button
        className="p-2 rounded-full bg-white text-[#BB543B] border-[#BB543B] border-2 font-black text-sm fixed z-50 bottom-6 right-6"
        onClick={() => toggle()}
      >
        {playing ? <SpeakerLoudIcon /> : <SpeakerOffIcon />}
      </button>
    </div>
  );
};

export default Player;
