// Colors constants for React Native app
// Using this approach instead of color literals for better maintainability and theme support

export const Colors = {
  // Primary colors
  primary: '#8794FF',
  primaryLight: '#8794FF33',
  primaryBackground: '#E8EDFF',

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    light: '#F0F0F0',
    medium: '#E5E5E5',
    dark: '#E0E0E0',
    text: '#666666',
  },

  // Semantic colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F0F0F0',
    skeleton: '#E8EDFF',
  },

  text: {
    primary: '#000000',
    secondary: '#666666',
    light: '#FFFFFF',
  },

  // Component specific
  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.1)',
} as const;

// Type for color values
export type ColorValue = (typeof Colors)[keyof typeof Colors] | string;
