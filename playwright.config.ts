import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: "https://sweetshop.netlify.app",
    headless: true,
    viewport: { width: 1280, height: 720 }
  },
  testDir: "./tests"
});