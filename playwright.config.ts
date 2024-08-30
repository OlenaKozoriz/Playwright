import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
//dotenv.config({ path: path.resolve(__dirname, ".env") });
require("dotenv").config();

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
  globalSetup: "global-setup.ts",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 40_000,

  use: {
    ...devices["Desktop Chrome"],
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.HTTP_CREDENTIALS_USERNAME!,
      password: process.env.HTTP_CREDENTIALS_PASSWORD!,
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    headless: true,
    viewport: {
      width: 1450,
      height: 720,
    },
  },

  expect: {
    timeout: 15_000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "qauto", //Locators, actions and asserts in Playwright
      testMatch: "**.qauto.spec.ts",
    },
    {
      name: "qauto_POM", //POM in Playwright
      testMatch: "**.qauto.pom.spec.ts",
    },
    {
      name: "login", //Session storage via the separate file, using context().storageState
      testMatch: "login.setup.ts",
    },
    {
      name: "qauto_setup", //Project with refferal to Login file with the storaged state
      testMatch: "**.qauto.setup.spec.ts",
      use: {
        //Session storage is used for storing information associated with the signed-in state
        storageState: "session-storage.json",
      },
      //Defining a project that runs before all other projects (in this case - "Logging in the registered user").
      dependencies: ["login"],
    },
    {
      name: "fixtures", //Session storage via the separate FIXTURE file
      testMatch: "userGaragePage.spec.ts",
    },
    {
      name: "qauto_fixture", //Project with refferal to the fixture with the storaged state
      testMatch: "**.fixture.setup.spec.ts",
      use: {
        //Session storage is used for storing information associated with the signed-in state
        storageState: "session-storage.json",
      },
      //Defining a project that runs before all other projects (in this case - "Logging in the registered user").
      dependencies: ["fixtures"],
    },
    {
      name: "qauto_mocking", //Playwright Network (project with Response Body mocking)
      testMatch: "profileMockResponse.setup.spec.ts",
      use: {
        storageState: "session-storage.json",
      },

      dependencies: ["fixtures"],
    },
    {
      name: "api-testing", //Playwright API Request)
      testMatch: "*api/*.spec.ts",
      use: {
        storageState: "session-storage.json",
      },
      dependencies: ["fixtures"],
    },
  ],
});
