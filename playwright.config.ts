import {devices, PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 0,
  reporter: 'html',
  use: {
    ...devices['Desktop Chrome'],
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
};

export default config;
