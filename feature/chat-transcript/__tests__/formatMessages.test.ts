import {
  MOCK_SPEAKERS,
  PAUSE,
  FORMATTED_CHAT,
} from "@/test-data/speakers.mock";
import { formatMessages } from "../ChatTranscript.utils";

describe("formatMessages – provided sample", () => {
  it("matches the expected merged timeline", () => {
    const result = formatMessages(PAUSE, MOCK_SPEAKERS);
    expect(result).toEqual(FORMATTED_CHAT);
  });
});
