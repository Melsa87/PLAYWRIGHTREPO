import { test, expect } from '../fixtures/CustomFixtures';
import { TestData } from '../Data.ts/TestData';

const courses = [
  'Testing Course',
  'API Testing with Postman – Fundamentals',
  'API Testing with Postman – Fundamentals',
  'Testing Course',
];

const clientName = 'Melsa Pty Ltd';
const clientAddress = '1091991 Cape Town';
const invoiceDescription = 'Automated invoice for self client';
const expectedTotal = 'R2800';

test('create invoice to self client and verify total', async ({ loginPage, invoicePage }) => {

  // LOGIN
  await loginPage.performFullLogin(TestData.username, TestData.password);

  // NAVIGATION
  await invoicePage.openAdminPanel();
  await invoicePage.navigateToInvoicesPage();
  await invoicePage.clickNewInvoice();

  // CLIENT DETAILS
  await invoicePage.enterClientDetails(clientName, clientAddress);

  // ADD COURSES + SELECT COURSES (CLEAN LOOP)
  for (const course of courses) {
    await invoicePage.clickAddCourse();
    await invoicePage.addCourse(course);
  }

  // INVOICE DETAILS
  await invoicePage.enterDescription(invoiceDescription);
  await invoicePage.verifyInvoiceTotal(expectedTotal);
  await invoicePage.setDueDateToLastDayOfJune();
  await invoicePage.selectStatus('paid');

  // CREATE + VERIFY
  await invoicePage.clickCreateInvoice();
  await invoicePage.verifyInvoiceCreated(clientName);
});