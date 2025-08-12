# Audio Interleave Chat

Interactive audio playback with synchronized chat transcript display.

## Features

- **Audio Playback**: Full control with play/pause, seek, and navigation
- **Interactive Progress Bar**: Drag or tap to jump to any position
- **Synchronized Chat**: Real-time transcript with active message highlighting
- **Auto-Scroll**: Smart scrolling that follows playback but respects user interaction
- **Loading States**: Smooth skeleton loading with visual feedback

## Quick Start

```bash
npm install
npx expo start
```

## Project Structure

```
├── components/          # Reusable UI components
├── features/           # Feature-specific modules
│   ├── audio-player/   # Audio controls and progress bar
│   └── chat-transcript/ # Chat display and auto-scroll
├── providers/          # Context providers for state management
└── types/             # TypeScript type definitions
```

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Native Reanimated** for smooth animations
- **expo-av** for audio playback
- **Context API** for state management
