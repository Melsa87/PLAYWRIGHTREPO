import {Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    async openNdosiPage() {
        await this.basePageGoToUrl('/');

    }

    async navigateToLoginPage() {
        await this.basePageClickElement(this.page.getByRole('button', { name: 'Login' }));
        await expect(this.page.locator('#login-email')).toBeVisible();
    }

    async userLogin(username: string, password: string) {
        await this.basePageEnterText(this.page.locator('#login-email'), username);
        await this.basePageEnterText(this.page.locator('#login-password'), password);
        await this.basePageClickElement(this.page.locator('xpath=//button[contains(.,"Login")]'));
    }

    async performFullLogin(username: string, password: string) {
        await this.basePageGoToUrl('/');
        await this.navigateToLoginPage();
        await this. userLogin(username, password);
    }


}