import { useEffect, useMemo, useRef } from "react";
import { useAudioPlayer } from "@/providers/AudioPlayerProvider";
import { getActiveMessageIndex } from "@/utils/getActiveMessage";
import { useChatMessages } from "@/providers/ChatMessagesProvider";
import {
  DEFAULT_AUDIO_RATE,
  AUDIO_SLOWED_RATE,
  DEBOUNCE_DIFF_RATE_MS,
} from "@/const/player";

export const useAudioControllers = () => {
  const slowedMsg = useRef<number>(null);

  const { play, isPlaying, pause, seek, currentTimeMs, setAudioRate } =
    useAudioPlayer();
  const { chatMessages } = useChatMessages();

  const activeMsgIndex = useMemo(() => {
    if (!chatMessages) return null;
    return getActiveMessageIndex(currentTimeMs, chatMessages);
  }, [chatMessages, currentTimeMs]);

  const handleNextMsg = () => {
    if (!chatMessages) return;
    const currentMsg = getActiveMessageIndex(currentTimeMs, chatMessages);

    if (!currentMsg) return;
    const startTimeMs = chatMessages[currentMsg + 1].startTime;
    seek(startTimeMs);
  };

  useEffect(() => {
    if (activeMsgIndex !== slowedMsg.current) {
      setAudioRate(DEFAULT_AUDIO_RATE);
      slowedMsg.current = null;
    }
  }, [activeMsgIndex, setAudioRate]);

  const handlePrevMsg = () => {
    if (!activeMsgIndex || !chatMessages) return;

    const isGoBack =
      currentTimeMs - chatMessages[activeMsgIndex].startTime <
      DEBOUNCE_DIFF_RATE_MS;

    if (!isGoBack) {
      seek(chatMessages[activeMsgIndex].startTime);
      return;
    }

    const prevMsg = chatMessages[activeMsgIndex - 1];
    if (!prevMsg) return;
    seek(prevMsg.startTime);
  };

  const handleRepeatLastMsg = async () => {
    if (!activeMsgIndex || !chatMessages) return;
    await setAudioRate(AUDIO_SLOWED_RATE);

    const prevMsg = chatMessages[activeMsgIndex - 1];
    if (!prevMsg) {
      seek(chatMessages[activeMsgIndex].startTime);
      slowedMsg.current = activeMsgIndex;
      return;
    }
    slowedMsg.current = activeMsgIndex - 1;
    seek(prevMsg.startTime);
  };

  return {
    play,
    pause,
    seek,
    isPlaying,
    handleNextMsg,
    handlePrevMsg,
    handleRepeatLastMsg,
  };
};
