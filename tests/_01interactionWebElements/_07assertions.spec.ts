import {test,expect} from '@playwright/test';

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('assertions', async ({page})=>{
    const basicFormButton = page.locator('nb-card',{hasText:'Basic form'}).locator('button')

    //General assertions
    const value = 5
    expect(value).toEqual(5)
    const text = await basicFormButton.textContent()
    expect (text).toBe('Submit')

    //Locator assertions(have to use await because it is a locator assertion and returns a promise)
    await expect(basicFormButton).toHaveText('Submit')

    //Soft assertions (if one fails, the test continues) limit of  5000ms
    await expect.soft(basicFormButton).toHaveText('Submit5')
    await basicFormButton.click()

})