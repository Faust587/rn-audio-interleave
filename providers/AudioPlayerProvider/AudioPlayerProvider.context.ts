import { createContext } from "react";

export type AudioPlayerContextType = {
  currentTimeMs: number;
  durationMs: number;
  isPlaying: boolean;
  load: (source: number) => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  seek: (ms: number) => Promise<void>;
  setAudioRate: (rate: number) => Promise<void>;
};

export const AudioPlayerContext = createContext<AudioPlayerContextType | null>(
  null,
);
