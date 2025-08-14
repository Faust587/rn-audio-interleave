import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Audio } from 'expo-av';

import { AudioPlayerContext } from './AudioPlayerProvider.context';

export const AudioPlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [currentTimeMs, setCurrentTimeMs] = useState(0);
  const [durationMs, setDurationMs] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const load = useCallback(async (source: number) => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      const { sound } = await Audio.Sound.createAsync(source, {
        progressUpdateIntervalMillis: 10,
      });
      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate(status => {
        if (!status.isLoaded) return;
        const s = status;
        setCurrentTimeMs(s.positionMillis);
        setIsPlaying(s.isPlaying);
        if (s.durationMillis) {
          setDurationMs(s.durationMillis);
        }
      });
    } catch (err) {
      console.error('Error loading audio:', err);
    }
  }, []);

  const play = useCallback(async () => {
    try {
      if (soundRef.current) {
        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded) {
          if (
            status.didJustFinish ||
            status.positionMillis >= (status?.durationMillis ?? 0)
          ) {
            await soundRef.current.setPositionAsync(0);
          }
          await soundRef.current.playAsync();
        }
      }
    } catch (err) {
      console.error('Error playing audio:', err);
    }
  }, []);

  const pause = useCallback(async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.pauseAsync();
      }
    } catch (err) {
      console.error('Error pausing audio:', err);
    }
  }, []);

  const seek = useCallback(async (ms: number) => {
    try {
      if (soundRef.current) {
        await soundRef.current.setPositionAsync(ms);
      }
    } catch (err) {
      console.error('Error seeking audio:', err);
    }
  }, []);

  const setAudioRate = useCallback(async (rate: number) => {
    try {
      if (soundRef.current) {
        await soundRef.current.setRateAsync(rate, true);
        soundRef.current.setOnPlaybackStatusUpdate(status => {
          if (!status.isLoaded) return;
          const s = status;
          setCurrentTimeMs(s.positionMillis);
          setIsPlaying(s.isPlaying);
          if (s.durationMillis) {
            setDurationMs(s.durationMillis);
          }
        });
      }
    } catch (err) {
      console.error('Error setting audio rate:', err);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          allowsRecordingIOS: false,
          staysActiveInBackground: false,
        });
      } catch (err) {
        console.error('Error setting audio mode:', err);
      }
    })();

    return () => {
      soundRef.current?.unloadAsync().catch(err => {
        console.error('Error unloading audio:', err);
      });
    };
  }, []);

  const value = useMemo(
    () => ({
      currentTimeMs,
      durationMs,
      isPlaying,
      load,
      play,
      pause,
      seek,
      setAudioRate,
    }),
    [
      currentTimeMs,
      durationMs,
      isPlaying,
      load,
      play,
      pause,
      seek,
      setAudioRate,
    ],
  );

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
