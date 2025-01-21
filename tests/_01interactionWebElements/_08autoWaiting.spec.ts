import {test,expect} from '@playwright/test';

test.beforeEach(async ({page})=>{
    await page.goto('http://uitestingplayground.com/ajax')
    await page.locator('button').getByText('Button Triggering AJAX Request').click();
})
test.skip('auto waiting', async ({page})=>{
    const successButton = await page.locator('.bg-success');

    //await successButton.click();

    //const text = await successButton.textContent()

    //manual waiting
    //await successButton.waitFor({state:'attached'})
    //const text = await successButton.allTextContents()
    //expect(text).toContain('Data loaded with AJAX get request.')

    //5s default timeout of expect
    await expect(successButton).toHaveText('Data loaded with AJAX get request.',{timeout:20000})
})

test('alternative waits',async ({page})=>{
    const successButton = await page.locator('.bg-success');

    // wait for element
    //await page.waitForSelector('.bg-success')

    // wait for particular reponse of an api call
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //wait for network calls to be completed (Not recommended) wait until all api calls in the page are completed
    //await page.waitForLoadState('networkidle')
    
    //wait just for timeout it self
    //await page.waitForTimeout(16000)

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})