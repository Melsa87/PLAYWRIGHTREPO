import {Page,Locator,expect} from '@playwright/test';

export class BasePage {
    constructor(public page: Page) {
        this.page = page;
    }

    async clickElement(locator: Locator) {
        await expect(locator).toBeVisible();
        await locator.click();
    }
    async fillInput(locator: Locator, value: string) {
        await expect(locator).toBeVisible();
        await locator.fill(value);
    }
    async waitForElement(locator: Locator, timeout: number = 5000) {
        await expect(locator).toBeVisible({ timeout });
    }
    async getElementText(locator: Locator): Promise<string> {
        await expect(locator).toBeVisible();
        return await locator.textContent() || '';
    }
}