export const app = {
  pexelsApiKey: process.env.NEXT_PUBLIC_PEXELS_API_KEY ?? " ",
  isDevEnv: process.env.NEXT_PUBLIC_ENV === "dev",
};
