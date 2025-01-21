import { test, expect } from "@playwright/test";
test.beforeEach(async ({page})=>{
    await page.goto("http://localhost:4200");
    await page.getByText("Forms").click();
    await page.getByText("Datepicker").click();
})
test("datepicker", async ({ page }) => {

  const calendarInputField = await page
    .locator("nb-card", { hasText: "Common Datepicker" })
    .getByPlaceholder("Form Picker");

  calendarInputField.click();

  await page
    .locator('[class="day-cell ng-star-inserted"]')
    .getByText("1", { exact: true })
    .click();

  await expect(calendarInputField).toHaveValue("Jan 1, 2025");
});

test("datepicker 2", async ({ page }) => {

    const calendarInputField = await page
      .locator("nb-card", { hasText: "Common Datepicker" })
      .getByPlaceholder("Form Picker");
  
    calendarInputField.click();
    
    let date = new Date()
    date.setDate(date.getDate() + 200)
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleDateString('En-US',{month:'short'})
    const expectedMonthLong = date.toLocaleDateString('En-US',{month:'long'})
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear =` ${expectedMonthLong} ${expectedYear} `

    while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
      await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
      calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }
    await page
      .locator('[class="day-cell ng-star-inserted"]')
      .getByText(expectedDate, { exact: true })
      .click();
  
    await expect(calendarInputField).toHaveValue(dateToAssert);
  });

test('automate date selection',async ({page})=>{

})