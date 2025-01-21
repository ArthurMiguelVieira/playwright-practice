import {test,expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();
  });

  test('Dialog box', async ({ page }) => {

    page.on('dialog',dialog =>{
        expect(dialog.message()).toBe('Are you sure you want to delete?');
        dialog.accept();
    })

    await page.getByRole('table').locator('tr', {hasText:"mdo@gmail.com"}).locator('.nb-trash').click();

    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com');
  });