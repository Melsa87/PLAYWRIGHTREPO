import { test } from '../fixtures/CustomFixtures';
import { TestData } from '../Data.ts/TestData';

const courses = [
  'API Testing with Postman – Fundamentals',
  'API Testing with Postman – Fundamentals',
  'API Testing with Postman – Fundamentals',
  'API Testing with Postman – Fundamentals',
];

const clientName = 'Melsa Pty Ltd';
const clientAddress = '1091991 Cape Town';
const invoiceDescription = 'Automated invoice for self client';
const expectedTotal = 'R2800';

test('Create invoice for self client', async ({
  loginPage,
  invoicePage,
}) => {

  // Login
  await loginPage.performFullLogin(
    TestData.username,
    TestData.password
  );

  // Navigate
  await invoicePage.openAdminPanel();
  await invoicePage.navigateToInvoicesPage();
  await invoicePage.clickNewInvoice();

  // Invoice Details
  await invoicePage.enterClientDetails(
    clientName,
    clientAddress
  );

  await invoicePage.addCourses(courses);

  await invoicePage.enterDescription(invoiceDescription);

  await invoicePage.verifyInvoiceTotal(expectedTotal);

  await invoicePage.setDueDateToLastDayOfJune();

  await invoicePage.selectStatus('paid');

  // Submit
  await invoicePage.clickCreateInvoice();

  // Verify
  await invoicePage.verifyInvoiceCreated(clientName);
});