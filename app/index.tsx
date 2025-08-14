import { StyleSheet, View } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Colors } from '@/const';
import { AudioPlayer } from '@/feature/audio-player';
import { ChatTranscript } from '@/feature/chat-transcript';
import { AudioPlayerProvider } from '@/providers/AudioPlayerProvider/AudioPlayerProvider';
import { ChatMessageProvider } from '@/providers/ChatMessagesProvider';

export default function Index() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AudioPlayerProvider>
        <ChatMessageProvider>
          <View style={styles.container}>
            <View style={styles.shadowTop} />
            <View style={styles.chatWrapper}>
              <ChatTranscript />
            </View>
            <AudioPlayer />
          </View>
        </ChatMessageProvider>
      </AudioPlayerProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  shadowTop: {
    height: 1,
    backgroundColor: Colors.background.primary,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1,
  },
  chatWrapper: {
    flex: 1,
    paddingHorizontal: 22,
  },
});
