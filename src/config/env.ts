export const config = {
  googleSheet: {
    url: import.meta.env.VITE_GOOGLE_SHEET_URL || '',
  },
} as const;

if (!config.googleSheet.url) {
  throw new Error('VITE_GOOGLE_SHEET_URL is required in .env file');
}