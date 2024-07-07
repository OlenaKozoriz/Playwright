import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 40_000,

  use: {
    ...devices["Desktop Chrome"],
    baseURL: "https://qauto.forstudy.space/",
    httpCredentials: {
      username: "guest",
      password: "welcome2qauto",
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    headless: false,
    viewport: {
      width: 1450,
      height: 720,
    },
  },

  expect: {
    timeout: 12_000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "qauto",
      testMatch: "**.qauto.spec.ts",
    },
  ],
});
