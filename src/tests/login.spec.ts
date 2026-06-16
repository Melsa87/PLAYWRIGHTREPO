import { test, expect } from '@playwright/test';
import { TestData } from '../Data.ts/TestData';

test('verify login functionality', async ({ page }) => {
  await page.goto('https://ndosisimplifiedautomation.vercel.app');

  // 1. Login button that opens the form/modal
  const openLoginButton = page
    .locator('button:has-text("Login")')
    .first();

  await expect(openLoginButton).toBeVisible();
  await openLoginButton.click();

  // 2. Fill login form
  const emailInput = page.locator('input[name="email"]');
  const passwordInput = page.locator('input[name="password"]');
  await page.waitForTimeout(8000);   // wait for form to appear
  await emailInput.fill(TestData.username);
  await passwordInput.fill(TestData.password);

  // 3. Login button inside form (submit button)
  const submitLoginButton = page
    .locator('button:has-text("Login")')
    .nth(1); // second login button

  await expect(submitLoginButton).toBeVisible();
  await submitLoginButton.click();

  // 4. Verify success
  const welcomeMessage = page.locator('text=Welcome, Melsa!');
  await expect(welcomeMessage).toBeVisible();
});