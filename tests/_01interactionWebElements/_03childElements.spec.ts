import {test,expect} from '@playwright/test';

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})
test('locating child elements',async({page})=>{

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    //same thing as above
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    //combine locator with user facing locator
    await page.locator('nb-card').getByRole('button',{name:'Sign in'}).first().click()

    //combine with index (not recommended) try to find more unique elements, just if nothing works.
    await page.locator('nb-card').nth(3).getByRole('button').click()


})