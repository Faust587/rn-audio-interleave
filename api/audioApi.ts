import { rootAPI } from '@/api';
import { TranscriptMetadata } from '@/types';
import audioTranscriptRes from './mock/audio_transcript.json';
import audioRes from './mock/audio.mp3';

type audioApiType = {
  getAudioTranscript: () => Promise<TranscriptMetadata>;
  getAudio: () => Promise<number>;
};

export const audioApi: audioApiType = {
  getAudioTranscript: async () => {
    try {
      await rootAPI();
      return audioTranscriptRes as TranscriptMetadata;
    } catch (err) {
      console.error('Error fetching audio transcript:', err);
      throw err;
    }
  },

  getAudio: async () => {
    try {
      await rootAPI();
      return audioRes as unknown as number;
    } catch (err) {
      console.error('Error fetching audio file:', err);
      throw err;
    }
  },
};
