import { rootAPI } from "@/api";
import audioTranscriptRes from "./mock/audio_transcript.json";
import audioRes from "./mock/audio.mp3";

export const audioApi = {
  getAudioTranscript: async () => {
    await rootAPI();
    return audioTranscriptRes;
  },
  getAudio: async () => {
    await rootAPI();
    return audioRes;
  },
};
