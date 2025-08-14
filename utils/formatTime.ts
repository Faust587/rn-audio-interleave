/**
 * Formats time in milliseconds to MM:SS format
 * @param ms - Time in milliseconds
 * @returns Formatted time string in MM:SS format
 */
export const formatTime = (ms: number): string => {
  // Handle negative numbers by treating them as zero
  const safeMs = Math.max(0, ms);
  const totalSeconds = Math.floor(safeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
