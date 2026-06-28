import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get verifyHomePageHeading(): Locator {
        return this.page.getByRole('heading', { name: /Welcome\s*back/i });
    }

    get adminMenuButton(): Locator {
        return this.page.getByRole('button', { name: 'G Menu ▼' });
    }

    get adminPanelButton(): Locator {
        return this.page.getByRole('button', { name: '🔧 Admin Panel' });
    }

    async verifyHomePageIsDisplayed() {
        await this.waitForElement(this.verifyHomePageHeading);
    }

    async navigateToAdminPanel() {
        await this.clickElement(this.adminMenuButton);
        await this.clickElement(this.adminPanelButton);
    }
}
