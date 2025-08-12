export type TranscriptMetadata = {
  pause: number;
  speakers: Speaker[];
};

export type Speaker = {
  name: string;
  phrases: Phrase[];
};

export type Phrase = {
  words: string;
  time: number;
};

export type ChatMessage = {
  id: string;
  speaker: string;
  message: string;
  time: number;
  startTime: number;
  endTime: number;
  right: boolean;
};
