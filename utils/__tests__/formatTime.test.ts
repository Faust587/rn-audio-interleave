import { formatTime } from '@/utils';

describe('formatTime', () => {
  it('formats 0 milliseconds correctly', () => {
    const result = formatTime(0);
    expect(result).toBe('0:00');
  });

  it('formats seconds only correctly', () => {
    const result = formatTime(30000); // 30 seconds
    expect(result).toBe('0:30');
  });

  it('formats minutes and seconds correctly', () => {
    const result = formatTime(90000); // 1 minute 30 seconds
    expect(result).toBe('1:30');
  });

  it('formats multiple minutes correctly', () => {
    const result = formatTime(150000); // 2 minutes 30 seconds
    expect(result).toBe('2:30');
  });

  it('pads single digit seconds with zero', () => {
    const result = formatTime(65000); // 1 minute 5 seconds
    expect(result).toBe('1:05');
  });

  it('handles large numbers correctly', () => {
    const result = formatTime(3661000); // 61 minutes 1 second
    expect(result).toBe('61:01');
  });

  it('handles edge case of exactly one minute', () => {
    const result = formatTime(60000); // 60 seconds
    expect(result).toBe('1:00');
  });

  it('handles edge case of 59 seconds', () => {
    const result = formatTime(59000); // 59 seconds
    expect(result).toBe('0:59');
  });

  it('rounds down fractional seconds', () => {
    const result = formatTime(1999); // 1.999 seconds
    expect(result).toBe('0:01');
  });

  it('handles negative numbers by treating them as zero', () => {
    const result = formatTime(-1000);
    expect(result).toBe('0:00');
  });
});
