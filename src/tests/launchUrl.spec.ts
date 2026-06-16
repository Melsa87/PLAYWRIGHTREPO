import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://ndosisimplifiedautomation.vercel.app');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Ndosi Test  Automation");
});

test('verify a login functionality', async ({ page }) => {
  await page.goto('*/');

const loginButton = page.locator('button:text("Login")');

await loginButton.isVisible();

});
