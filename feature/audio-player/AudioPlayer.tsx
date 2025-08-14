import { StyleSheet, View } from 'react-native';

import { ArrowLeftSVG, ArrowRightSVG, PauseSVG, PlaySVG } from '@/assets/svg';
import RepeatSVG from '@/assets/svg/RepeatSVG';
import { IconButton, ProgressBar } from '@/components';
import { useAudioControllers } from '@/feature/audio-player/hooks';
import { useChatMessages } from '@/providers/ChatMessagesProvider/index';

export const AudioPlayer = () => {
  const {
    isPlaying,
    play,
    pause,
    seek,
    currentTimeMs,
    durationMs,
    handleNextMsg,
    handlePrevMsg,
    handleRepeatLastMsg,
  } = useAudioControllers();
  const { isLoading } = useChatMessages();

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
          onPress={handlePrevMsg}
          disabled={isLoading}
        />
        <IconButton
          icon={isPlaying ? <PauseSVG /> : <PlaySVG />}
          onPress={isPlaying ? pause : play}
          backgroundColor="#8794FF33"
          disabled={isLoading}
        />
        <IconButton
          icon={<ArrowRightSVG />}
          onPress={handleNextMsg}
          disabled={isLoading}
        />
        <IconButton
          icon={<RepeatSVG />}
          onPress={handleRepeatLastMsg}
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
