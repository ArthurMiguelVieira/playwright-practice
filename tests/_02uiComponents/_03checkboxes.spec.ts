import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();
});
test("check boxes", async ({ page }) => {
  //my solution
  //const hideOnClickCheckBox = page.locator('nb-checkbox',{hasText:'Hide on click'}).locator('.custom-checkbox')
  //await hideOnClickCheckBox.uncheck({force:true})

  await page.getByRole('checkbox',{name:'Hide on click'}).uncheck({force:true})
  await page.getByRole('checkbox',{name:'Prevent arising of duplicate toast'}).check({force:true})

  const allBoxes = await page.getByRole("checkbox").all();

  for (const box of allBoxes) {
    await box.uncheck({force:true});
    expect.soft(await box.isChecked()).toBeFalsy();
  }
  
});
