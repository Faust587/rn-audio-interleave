import { AudioPlayer } from 'expo-audio';

import {
  AUDIO_SLOWED_RATE,
  DEBOUNCE_DIFF_RATE_SEC,
  DEFAULT_AUDIO_RATE,
} from '@/const';
import { ChatMessage } from '@/types';

interface IAudioControllerService {
  play(): void;
  pause(): void;
  next(): Promise<void>;
  prev(): Promise<void>;
  repeatSlowerLastMsg(): Promise<void>;
  customSeek(mls: number): Promise<void>;
}

export class AudioControllerService implements IAudioControllerService {
  private slowRateTimer: number | undefined;
  constructor(
    private audio: AudioPlayer,
    private chat: ChatMessage[],
  ) {
    this.play = this.play.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.pause = this.pause.bind(this);
    this.repeatSlowerLastMsg = this.repeatSlowerLastMsg.bind(this);
  }

  async customSeek(seconds: number): Promise<void> {
    await this.audio.seekTo(seconds);
  }

  pause(): void {
    try {
      this.audio.pause();
    } catch (error) {
      console.error('Pause error:', error);
    }
  }

  play(): void {
    this.audio.play();
  }

  async next(): Promise<void> {
    const activeMsgIndex = this.getMsgIndex();
    const nextIndex = activeMsgIndex + 1;
    const nextMsg = this.chat[nextIndex];

    this.clearSlowRateTimer();

    if (!nextMsg) {
      await this.audio.seekTo(0);
      return;
    }

    await this.audio.seekTo(this.msToSec(nextMsg.startTime));
  }

  async prev(): Promise<void> {
    const activeMsgIndex = this.getMsgIndex();
    const activeMsg = this.chat[activeMsgIndex];
    const prevIndex = activeMsgIndex - 1;
    const prevMsg = this.chat[prevIndex];

    this.clearSlowRateTimer();

    if (!prevMsg) {
      await this.audio.seekTo(0);
      return;
    }

    const diffBtwActiveMsg =
      this.audio.currentTime - this.msToSec(activeMsg.startTime);

    if (diffBtwActiveMsg > DEBOUNCE_DIFF_RATE_SEC) {
      await this.audio.seekTo(this.msToSec(activeMsg.startTime));
      return;
    }

    await this.audio.seekTo(this.msToSec(prevMsg.startTime));
  }

  async repeatSlowerLastMsg(): Promise<void> {
    const activeMsgIndex = this.getMsgIndex();
    const prevIndex = activeMsgIndex - 1;
    let msgToSlow = this.chat[prevIndex];

    // if previous message does not exist
    if (!msgToSlow) msgToSlow = this.chat[activeMsgIndex];

    this.clearSlowRateTimer();

    this.audio.setPlaybackRate(AUDIO_SLOWED_RATE);
    const timer = msgToSlow.endTime - msgToSlow.startTime;
    this.slowRateTimer = setTimeout(() => {
      this.audio.setPlaybackRate(DEFAULT_AUDIO_RATE, 'low');
    }, timer);

    await this.audio.seekTo(this.msToSec(msgToSlow.startTime));
  }

  private getMsgIndex(): number {
    const currentTimeMs = this.audio.currentTime * 1000;
    const index = this.chat.findIndex(
      msg => msg.endTime > currentTimeMs && msg.startTime <= currentTimeMs,
    );
    return index === -1 ? 0 : index;
  }

  private clearSlowRateTimer(): void {
    clearTimeout(this.slowRateTimer);
    this.audio.setPlaybackRate(DEFAULT_AUDIO_RATE);
  }

  private msToSec(ms: number): number {
    return ms / 1000;
  }
}
