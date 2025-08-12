import { StyleSheet, View } from "react-native";
import { IconButton } from "@/components";
import { ArrowLeftSVG, ArrowRightSVG, PlaySVG } from "@/assets/svg";
import RepeatSVG from "@/assets/svg/RepeatSVG";
import { useAudioControllers } from "@/feature/audio-player/hooks";

export const AudioPlayer = () => {
  const {
    isPlaying,
    play,
    pause,
    handleNextMsg,
    handlePrevMsg,
    handleRepeatLastMsg,
  } = useAudioControllers();
  return (
    <View style={styles.container}>
      <View style={styles.progressBarWrapper}></View>
      <View style={styles.controlsContainer}>
        <View style={styles.invisibleSlug}>
          <IconButton icon={<RepeatSVG />} disabled />
        </View>
        <IconButton icon={<ArrowLeftSVG />} onPress={handlePrevMsg} />
        <IconButton
          icon={<PlaySVG />}
          onPress={isPlaying ? pause : play}
          backgroundColor="#8794FF33"
        />
        <IconButton icon={<ArrowRightSVG />} onPress={handleNextMsg} />
        <IconButton icon={<RepeatSVG />} onPress={handleRepeatLastMsg} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,

    backgroundColor: "#fff",
  },
  progressBarWrapper: {
    flex: 1,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  invisibleSlug: {
    opacity: 0,
  },
});
