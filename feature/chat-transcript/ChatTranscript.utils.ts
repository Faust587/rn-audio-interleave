import { ChatMessage, Speaker } from '@/types';

/**
 * Merges and interleaves phrases from multiple speakers into a single chat timeline.
 *
 * The function:
 *  - Iterates over speakers' phrases in an interleaved order (S1[0], S2[0], S1[1], S2[1], ...).
 *  - Assigns a continuous timeline for all messages.
 *  - Calculates the start and end times for each message based on its duration and a pause value.
 *
 * @param {number} pause - The pause duration (in milliseconds) added after each phrase.
 * @param {Speaker[]} speakers - An array of speaker objects, each containing a name and a list of phrases.
 * @returns {ChatMessage[]} An array of chat messages with calculated start and end times.
 *
 * @example
 * const speakers = [
 *   { name: "John", phrases: [{ words: "Hi", time: 1000 }] },
 *   { name: "Jack", phrases: [{ words: "Hello", time: 1200 }] }
 * ];
 * const result = formatMessages(250, speakers);
 * // [
 * //   { id: "John-0-1250", speaker: "John", message: "Hi", time: 1000, startTime: 0, endTime: 1250 },
 * //   { id: "Jack-1250-2700", speaker: "Jack", message: "Hello", time: 1200, startTime: 1250, endTime: 2700 }
 * // ]
 */
export const formatMessages = (
  pause: number,
  speakers: Speaker[],
): ChatMessage[] => {
  if (!speakers?.length) return [];

  const speakerOnRight = speakers[0].name;

  let maxPhrases = 0;
  for (const s of speakers) {
    if (s.phrases.length > maxPhrases) maxPhrases = s.phrases.length;
  }

  const merged: ChatMessage[] = [];
  let clock = 0;

  for (let i = 0; i < maxPhrases; i++) {
    for (const s of speakers) {
      const p = s.phrases[i];
      if (!p) continue;

      const duration = Math.max(0, p.time | 0);
      const startTime = clock;
      const endTime = startTime + duration + pause;

      merged.push({
        id: `${s.name}-${startTime}-${endTime}`,
        speaker: s.name,
        message: p.words,
        time: duration,
        startTime,
        endTime,
        right: speakerOnRight === s.name,
      });

      clock = endTime;
    }
  }

  return merged;
};
