module.exports = {
  // Basic formatting
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,

  // JSX specific (React Native optimized)
  jsxSingleQuote: false, // Use double quotes for JSX attributes
  bracketSameLine: false, // Put JSX closing bracket on new line
  htmlWhitespaceSensitivity: 'css', // Respect whitespace in JSX

  // React Native specific formatting
  bracketSpacing: true, // { foo } instead of {foo}
  arrowParens: 'avoid', // x => x instead of (x) => x (common in RN)
  endOfLine: 'lf', // Unix line endings for cross-platform
  quoteProps: 'as-needed', // Only quote props when needed

  // File extensions to format
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
    {
      // React Native component files
      files: ['**/components/**/*.{ts,tsx}', '**/screens/**/*.{ts,tsx}'],
      options: {
        printWidth: 100, // Slightly wider for component files
      },
    },
    {
      // StyleSheet files
      files: ['**/*.styles.{ts,tsx}', '**/styles/**/*.{ts,tsx}'],
      options: {
        printWidth: 120, // Wider for style objects
      },
    },
    {
      files: ['*.json'],
      options: {
        parser: 'json',
        trailingComma: 'none',
      },
    },
    {
      // app.json and expo configuration
      files: ['app.json', 'expo.json', 'eas.json'],
      options: {
        parser: 'json',
        tabWidth: 2,
        trailingComma: 'none',
      },
    },
    {
      files: ['*.md'],
      options: {
        parser: 'markdown',
        printWidth: 100,
        proseWrap: 'always',
      },
    },
    {
      files: ['*.yaml', '*.yml'],
      options: {
        parser: 'yaml',
        tabWidth: 2,
      },
    },
  ],
};
