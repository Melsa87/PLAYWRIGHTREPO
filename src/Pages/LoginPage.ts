import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async openNdosiPage() {
        await this.page.goto('/');
    }

    async navigateToLoginPage() {
        await this.page.getByRole('button', { name: 'Login' }).click();
        await expect(this.page.locator('#login-email')).toBeVisible();
    }

    async userLogin(username: string, password: string) {
        await this.page.locator('#login-email').fill(username);
        await this.page.locator('#login-password').fill(password);
        await this.page.locator('xpath=//button[contains(.,"Login")]').click();
    }

    async performFullLogin(username: string, password: string) {
        await this.openNdosiPage();
        await this.navigateToLoginPage();
        await this.userLogin(username, password);
    }


}