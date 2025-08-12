import { FORMATTED_CHAT } from '@/test-data/speakers.mock';
import { getActiveMessage } from '@/utils';
import { getActiveMessageIndex } from '@/utils/getActiveMessage';

describe('getActiveMessage – provided sample', () => {
  it('get right message entity by timeline', () => {
    const resultWithMessage = getActiveMessage(1500, FORMATTED_CHAT);
    expect(resultWithMessage).toEqual(FORMATTED_CHAT[0]);
  });

  it("get 'undefined' when time is outside of timeline", () => {
    const resultWithMessage = getActiveMessage(100_000, FORMATTED_CHAT);
    expect(resultWithMessage).toEqual(undefined);
  });

  it('get right message index by timeline', () => {
    const resultWithMessage = getActiveMessageIndex(1500, FORMATTED_CHAT);
    expect(resultWithMessage).toEqual(0);
  });

  it("get 'undefined' instead of specific index when time is outside of timeline", () => {
    const resultWithMessage = getActiveMessage(100_000, FORMATTED_CHAT);
    expect(resultWithMessage).toEqual(undefined);
  });
});
