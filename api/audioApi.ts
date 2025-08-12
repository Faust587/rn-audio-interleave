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
    await rootAPI();
    return audioTranscriptRes as TranscriptMetadata;
  },
  getAudio: async () => {
    await rootAPI();
    return audioRes as unknown as number;
  },
};
