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

## Development Commands

### 🚀 Running the App

```bash
# Start development server
npm start

# Run on specific platform
npm run android          # Android device/emulator
npm run ios              # iOS device/simulator
npm run web              # Web browser (localhost:8081)
```

### 🧪 Testing

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:watch

# Run tests with coverage report
npm run test:cov
```

### 🔧 Code Quality

```bash
# Check and fix linting issues
npm run lint
npm run lint:fix

# Format code with Prettier
npm run format
npm run format:check

# TypeScript type checking
npm run type-check

# Run complete CI pipeline
npm run ci
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

## Code Quality & Standards

### 🎨 Styling

- **Color constants** in `/const/colors.ts` instead of inline values
- **Consistent spacing** and typography
- **React Native optimized** ESLint rules

### 📏 ESLint & Prettier

- **React Native specific rules** enabled
- **Import organization** with automatic sorting
- **Pre-commit hooks** for code quality
- **TypeScript strict mode** with helpful warnings

### 🧪 Testing

- **Jest** with React Native preset
- **Integration tests** for critical user flows
- **Coverage reporting** with detailed metrics
- **Mocked components** for reliable testing

## Local Web Development

To run the web version locally:

```bash
# Start the development server
npm run web

# The app will be available at:
# http://localhost:8081
```

**Web Platform Notes:**

- Audio functionality works via HTML5 Audio API
- All React Native Reanimated animations are supported
- Gesture handlers work with mouse interactions
- Perfect for development and testing UI/UX
- Some native-specific features may have limitations

## Troubleshooting

### Common Issues

**Tests failing?**

```bash
# Clear Metro cache and reinstall
npm run format && npm run lint:fix
rm -rf node_modules && npm install
```

**Web version not loading?**

```bash
# Clear Expo cache
npx expo start --clear
```

**Import errors?**

- Check that all imports use the correct `@/` aliases
- Ensure ESLint import order rules are followed
