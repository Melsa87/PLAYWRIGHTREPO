import {test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/Loginpage';
import { InvoicePage } from '../pages/InvoicePage';


type CustomFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    invoicePage: InvoicePage;
    

};

export const test = base.extend<CustomFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    invoicePage: async ({ page }, use) => {
        await use(new InvoicePage(page));
    }

});


export { expect } from '@playwright/test';
