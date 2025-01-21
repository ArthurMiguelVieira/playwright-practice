import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByText('Modal & Overlays').click();
  await page.getByText('Tooltip').click();
});

test('tooltip test', async ({ page }) => {
  const topButton = page.locator('nb-card nb-card-body :text("Top")');
  await topButton.hover();
  
  // Wait for the tooltip to appear
  const tooltipContainer = page.locator('.cdk-overlay-container');
  const tooltip = tooltipContainer.locator('nb-tooltip');

  //page.getByRole('tooltip'); // works but just if tooltip role is created in html

  // Assert the tooltip's content
  await expect(tooltip).toBeVisible(); // Verify the tooltip is visible
  const tooltipInnerText = await tooltip.textContent(); // Wait for the text content
  expect(tooltipInnerText).toBe('This is a tooltip'); // Trim any whitespace and assert
});

test('tooltip test 2', async ({ page }) => {
    const topButton = page.locator('nb-card nb-card-body [nbtooltipicon="alert-triangle"]');
    await topButton.hover();
    
    // Wait for the tooltip to appear
    const tooltipContainer = page.locator('.cdk-overlay-container');
    const tooltip = tooltipContainer.locator('nb-tooltip');
    
    const iconData = await tooltip.locator('g g').getAttribute('data-name');

    // Assert the tooltip's content
    await expect(tooltip).toBeVisible(); // Verify the tooltip is visible
    expect(iconData).toBe('alert-triangle'); // Trim any whitespace and assert
  });
