import { useMemo } from 'react';

import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

import { AudioControllerService } from '@/services/AudioControllerService';
import { ChatMessage } from '@/types/index';

import audioRes from '../api/mock/audio.mp3';

type UseAudioControllerProps = {
  src: number;
  chat: ChatMessage[];
};

export const useAudioController = ({ chat, src }: UseAudioControllerProps) => {
  const audio = useAudioPlayer(audioRes);
  const status = useAudioPlayerStatus(audio);

  const controller = useMemo(
    () => new AudioControllerService(audio, chat),
    [audio, chat],
  );

  return {
    controller,
    isPlaying: status.playing ?? false,
    currentTime: status.currentTime ?? 0,
    duration: status.duration ?? 0,
  };
};
