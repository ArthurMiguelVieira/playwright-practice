import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
})

test.describe('suite1', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByTitle('Modal & Overlays').click();
  })
  
  
  test('first test', async ({ page }) => {
    await page.getByText('Dialog').click();
  })
  
  test('second test - datepicker', async ({ page }) => {
    await page.getByText('Popover').click();
  })
})

test.describe('suite2', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click();
  })
  
  
  test('first test', async ({ page }) => {
    await page.getByText('Form Layouts').click();
  })
  
  test('second test - datepicker', async ({ page }) => {
    await page.getByText('Datepicker').click();
  })
})