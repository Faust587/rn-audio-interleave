import { StyleSheet, View } from "react-native";
import { ChatTranscript } from "@/feature/chat-transcript";

export default function Index() {
  return (
    <View style={styles.container}>
      <ChatTranscript />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
  },
});
