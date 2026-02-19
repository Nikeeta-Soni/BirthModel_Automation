// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests sequentially (single worker) for reliable UI flow */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Single worker to prevent parallel conflicts on same account */
  workers: 1,
  /* Overall test timeout — 2 minutes for full signup/delete lifecycle */
  timeout: 120000,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Run tests in headed mode to launch visible Chrome browser */
    headless: true,
    /* Slow down by 500ms so actions are visible */
    launchOptions: {
      slowMo: 500,
    },
    /* Collect trace on first retry */
    trace: 'on-first-retry',
    /* Capture screenshot on failure */
    screenshot: 'only-on-failure',
    /* Default timeout for actions */
    actionTimeout: 15000,
    /* Default navigation timeout */
    navigationTimeout: 30000,
  },

  /* Run only on Chrome (Google Chrome channel) */
  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

