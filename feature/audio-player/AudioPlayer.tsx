import { StyleSheet, View } from 'react-native';

import { ArrowLeftSVG, ArrowRightSVG, PauseSVG, PlaySVG } from '@/assets/svg';
import RepeatSVG from '@/assets/svg/RepeatSVG';
import { IconButton, ProgressBar } from '@/components';
import { useAudioControllers } from '@/feature/audio-player/hooks';
import { useAudioController } from '@/hooks/useAudioController';
import { useChatMessages } from '@/providers/ChatMessagesProvider/index';

export const AudioPlayer = () => {
  const { seek } = useAudioControllers();
  const { isLoading, chatMessages } = useChatMessages();
  const {
    controller: audioController,
    isPlaying,
    currentTime,
    duration,
  } = useAudioController({
    chat: chatMessages ?? [],
    src: require('../../api/mock/audio.mp3'),
  });

  const currentTimeMs = currentTime * 1000;
  const durationMs = duration * 1000;

  return (
    <View style={styles.container}>
      <View style={styles.progressBarWrapper}>
        <ProgressBar
          currentTimeMs={currentTimeMs}
          durationMs={durationMs}
          onSeek={seek}
        />
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.invisibleSlug}>
          <IconButton icon={<RepeatSVG />} disabled />
        </View>
        <IconButton
          icon={<ArrowLeftSVG />}
          onPress={audioController.prev}
          disabled={isLoading}
        />
        <IconButton
          icon={isPlaying ? <PauseSVG /> : <PlaySVG />}
          onPress={isPlaying ? audioController.pause : audioController.play}
          backgroundColor="#8794FF33"
          disabled={isLoading}
        />
        <IconButton
          icon={<ArrowRightSVG />}
          onPress={audioController.next}
          disabled={isLoading}
        />
        <IconButton
          icon={<RepeatSVG />}
          onPress={audioController.repeatSlowerLastMsg}
          disabled={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  progressBarWrapper: {
    // Progress bar has its own internal sizing
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  invisibleSlug: {
    opacity: 0,
  },
});
