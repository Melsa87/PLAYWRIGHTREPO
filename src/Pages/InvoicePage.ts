import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InvoicePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Navigation

  async openAdminPanel() {
    await this.page.getByRole('button', { name: /Menu/i }).click();
    await this.page.getByRole('button', { name: /Admin Panel/i }).click();
  }

  async navigateToInvoicesPage() {
    await this.page.getByRole('button', { name: /Invoices/i }).click();
  }

  async clickNewInvoice() {
    await this.page.getByRole('button', { name: /New Invoice/i }).click();
  }

  // Locators

  get clientNameInput() {
    return this.page.getByRole('textbox', {
      name: /Type client name or email/i,
    });
  }

  get clientAddressInput() {
    return this.page.getByRole('textbox', {
      name: /Enter client address/i,
    });
  }

  get descriptionInput() {
    return this.page.getByRole('textbox', {
      name: /description/i,
    });
  }

  get dueDateInput() {
    return this.page.locator('input[type="date"]');
  }

  get statusDropdown() {
    return this.page.getByRole('combobox', { name: /status/i }).first();
  }

  get addCourseButton() {
    return this.page.getByRole('button', { name: /Add Course/i });
  }

  // Client Details

  async enterClientDetails(clientName: string, clientAddress: string) {
    await this.clientNameInput.fill(clientName);
    await this.clientAddressInput.fill(clientAddress);
  }

  // Courses

  async addCourses(courses: string[]) {
    for (let i = 0; i < courses.length; i++) {

      // Click Add Course
      await this.addCourseButton.waitFor({ state: 'visible' });
      await expect(this.addCourseButton).toBeEnabled();
      await this.addCourseButton.click({ force: true });
    
      //Temporary wait to ensure the new course dropdown is rendered
      const dropdown = this.page.locator('select').nth(i);

      const options = await dropdown.locator('option').allTextContents();
      console.log(options);

      // Wait for dropdowns to be available
      await expect(this.page.locator('select').nth(i)).toBeVisible({
        timeout: 10000,
      });

      // Select course
      await this.page
        .locator('select')
        .nth(i)
        .selectOption({ label: courses[i] });
    }
  }

  // Invoice Details

  async enterDescription(description: string) {
    await this.descriptionInput.fill(description);
  }

  async verifyInvoiceTotal(total: string) {
    await expect(this.page.getByText(total)).toBeVisible();
  }

  async setDueDateToLastDayOfJune(year = new Date().getFullYear()) {
    await this.dueDateInput.fill(`${year}-06-30`);
  }

  async selectStatus(status: string) {
    await this.statusDropdown.selectOption(status);
  }

  async clickCreateInvoice() {
    await this.page.getByRole('button', {
      name: /Create Invoice/i,
    }).click();
  }

  async verifyInvoiceCreated(clientName: string) {
    await expect(
      this.page.getByText(clientName)
    ).toBeVisible({ timeout: 10000 });
  }
}