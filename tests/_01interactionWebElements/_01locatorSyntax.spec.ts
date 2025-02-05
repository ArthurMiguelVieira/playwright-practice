import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
});
test.describe('Locator syntax rules',()=>{
    test('Locator examples',async({page}) => {
        //by Tag name
        await page.locator('input').first().click()

        //by ID
        page.locator('#inputEmail1',)

        //by Class value
        page.locator('.shape-rectangle')

        //by attribute
        page.locator('[placeholder="Email"]')

        //by Class value (full)
        page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

        //combine different selectors tag+attribute
        page.locator('input[placeholder="Email"]')

        // by XPath(Not recommended)
        page.locator('//*[@id="inputEmail1"]')

        //by partial text match
        page.locator(':text("Using")')

        //by text match
        page.locator(':text-is("Using the Grid")')
    })
})