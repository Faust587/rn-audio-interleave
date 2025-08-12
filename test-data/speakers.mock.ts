import { ChatMessage, Speaker } from "@/types/index";

export const PAUSE = 250;
export const MOCK_SPEAKERS: Speaker[] = [
  {
    name: "John",
    phrases: [
      { words: "this is one phrase.", time: 1474 },
      { words: "now the second phrase.", time: 1667 },
      { words: "end with last phrase.", time: 1214 },
    ],
  },
  {
    name: "Jack",
    phrases: [
      { words: "another speaker here.", time: 1570 },
      { words: "saying her second phrase.", time: 1989 },
      { words: "and eventually finishing up.", time: 1486 },
    ],
  },
];

export const FORMATTED_CHAT: ChatMessage[] = [
  {
    id: "John-0-1724",
    speaker: "John",
    message: "this is one phrase.",
    time: 1474,
    startTime: 0,
    endTime: 1724,
    right: true,
  },
  {
    id: "Jack-1724-3544",
    speaker: "Jack",
    message: "another speaker here.",
    time: 1570,
    startTime: 1724,
    endTime: 3544,
    right: false,
  },
  {
    id: "John-3544-5461",
    speaker: "John",
    message: "now the second phrase.",
    time: 1667,
    startTime: 3544,
    endTime: 5461,
    right: true,
  },
  {
    id: "Jack-5461-7700",
    speaker: "Jack",
    message: "saying her second phrase.",
    time: 1989,
    startTime: 5461,
    endTime: 7700,
    right: false,
  },
  {
    id: "John-7700-9164",
    speaker: "John",
    message: "end with last phrase.",
    time: 1214,
    startTime: 7700,
    endTime: 9164,
    right: true,
  },
  {
    id: "Jack-9164-10900",
    speaker: "Jack",
    message: "and eventually finishing up.",
    time: 1486,
    startTime: 9164,
    endTime: 10900,
    right: false,
  },
];
