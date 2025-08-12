import { FC, useMemo } from "react";
import { useData } from "@/feature/chat-transcript/hooks";
import { Text, View, StyleSheet } from "react-native";
import { ChatTranscriptComponent } from "@/feature/chat-transcript/ChatTranscript.component";
import { useAudioPlayer } from "@/providers/AudioPlayerProvider/AudioPlayerProvider.hooks";
import { getActiveMessage } from "@/utils/getActiveMessage";
import { ChatSkeleton, LoadingIndicator } from "@/components";

export const ChatTranscriptContainer: FC = () => {
  const { isLoading, error, chatMessages } = useData();

  const { currentTimeMs } = useAudioPlayer();

  const activeMessageId = useMemo(() => {
    if (!chatMessages) return;
    return getActiveMessage(currentTimeMs, chatMessages)?.id;
  }, [chatMessages, currentTimeMs]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ChatSkeleton count={5} />
        <View style={styles.loadingIndicatorContainer}>
          <LoadingIndicator size="medium" />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (chatMessages === null) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No messages available</Text>
      </View>
    );
  }

  return (
    <ChatTranscriptComponent
      activeMessageId={activeMessageId}
      chatMessages={chatMessages}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    position: "relative",
  },
  loadingIndicatorContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#FF6B6B",
    textAlign: "center",
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontWeight: "500",
  },
});
