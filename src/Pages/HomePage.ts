import { Locator} from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    get verifyHomePageHeading(): Locator {
        // return this.page.getByRole('heading', { name: /Welcome\s*back123/i }); //regex  for case insensitive match and to ignore any whitespace between "Welcome" and "back"
        return this.page.getByRole('heading', { name: /Welcome\s*back/i }); //Restore working regex
    }

    async verifyHomePageIsDisplayed() {
        await this.basePageVerifyElementIsVisible(this.verifyHomePageHeading);    
    }
    basePageVerifyElementIsVisible(verifyHomePageHeading: Locator) {
        throw new Error('Method not implemented.');
    }
    async navigateToAdminPanel(){
        
    }
}