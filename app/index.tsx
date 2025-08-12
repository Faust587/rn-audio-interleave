import { StyleSheet, View } from 'react-native';

import { AudioPlayer } from '@/feature/audio-player';
import { ChatTranscript } from '@/feature/chat-transcript';
import { AudioPlayerProvider } from '@/providers/AudioPlayerProvider/AudioPlayerProvider';
import { ChatMessageProvider } from '@/providers/ChatMessagesProvider';

export default function Index() {
  return (
    <AudioPlayerProvider>
      <ChatMessageProvider>
        <View style={styles.container}>
          <View style={styles.chatWrapper}>
            <ChatTranscript />
          </View>
          <AudioPlayer />
        </View>
      </ChatMessageProvider>
    </AudioPlayerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatWrapper: {
    flex: 1,
    paddingHorizontal: 22,
  },
});
