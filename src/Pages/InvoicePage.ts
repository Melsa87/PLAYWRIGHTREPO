import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class InvoicePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }


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

  get clientNameInput() {
    return this.page.getByRole('textbox', { name: /Type client name or email/i });
  }

  get clientAddressInput() {
    return this.page.getByRole('textbox', { name: /Enter client address/i });
  }

  get descriptionInput() {
    return this.page.getByRole('textbox', { name: /description/i });
  }

  get courseSelectors() {
    return this.page.getByRole('cell', { name: /Select course/i }).getByRole('combobox');
  }

  get dueDateInput() {
    return this.page.locator('input[type="date"]');
  }

  get statusSelect() {
    return this.page.getByRole('combobox', { name: /status/i });
  }

  async enterClientDetails(clientName: string, clientAddress: string) {
    await this.clientNameInput.fill(clientName);
    await this.clientAddressInput.fill(clientAddress);
  }

  async clickAddCourse() {
  const addCourseButton = this.page.getByRole('button', { name: /Add Course/i });

  await addCourseButton.waitFor({ state: 'visible' });
  await expect(addCourseButton).toBeEnabled();

  await addCourseButton.click({ force: true });
 }

 async addCourse(courseName: string) {
  const dropdowns = this.page.getByRole('cell', { name: /Select course/i }).getByRole('combobox');

  await dropdowns.last().waitFor({ state: 'visible' });

  await dropdowns
    .last()
    .selectOption({ label: courseName });
 }

 async addFourSameCourses() {
  const courseName = 'API Testing with Postman – Fundamentals';

  // Click Add Course 4 times
  for (let i = 0; i < 4; i++) {
    await this.clickAddCourse();
    await this.page.waitForTimeout(500);
  }

  // Select same course in each dropdown
  const dropdowns = this.page.getByRole('combobox');
  for (let i = 0; i < 4; i++) {
    await dropdowns
      .nth(i)
      .selectOption({ label: courseName });
  }

  }

  async selectCourseAt(index: number, optionValue: string) {
    await this.courseSelectors.nth(index).selectOption(optionValue);
  }

  async enterDescription(description: string) {
    await this.descriptionInput.fill(description);
  }

  async verifyInvoiceTotal(total: string) {
    const normalized = total.replace(/\s+/g, '');
    await expect(this.page.locator(new RegExp(`R\\s*${normalized.slice(1)}`))).toBeVisible();
  }

  async setDueDateToLastDayOfJune(year = new Date().getFullYear()) {
    const dueDate = `${year}-06-30`;
    await this.dueDateInput.fill(dueDate);
  }

  async selectStatus(status: string) {
    const statusLocator = this.statusSelect.first();
    if (await statusLocator.count() > 0) {
      await statusLocator.selectOption(status);
    } else {
      await this.page.getByRole('combobox').nth(4).selectOption(status);
    }
  }

  async clickCreateInvoice() {
    await this.page.getByRole('button', { name: /Create Invoice/i }).click();
  }

  async verifyInvoiceCreated(clientName: string) {
    await expect(this.page.getByText(clientName)).toBeVisible({ timeout: 10000 });
  }
}