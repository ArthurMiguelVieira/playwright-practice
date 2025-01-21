import {test,expect} from '@playwright/test';

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('locating using parent elements',async({page})=>{

    await page.locator('nb-card',{has:page.locator('text=Using the Grid')}).getByRole('button',{name:'Sign in'}).click()

    await page.locator('nb-card',{hasText:'Basic form'}).getByRole('button',{name:'Submit'}).click()

    await page.locator('nb-card',{has: page.locator('#inputEmail1')}).getByRole('textbox',{name:'Email'}).click()

    //same thing as above but using filter wich is more readable and versatile can use with getByRole, and can change multiple filters
    await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('button',{name:'Submit'}).click()

    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox',{name:'Password'}).click()

    await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:'Sign in'}).getByRole('button',{name:'Sign in'}).click()
    
    //not recommended
    // go one level up and then find the element
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox',{name:'Email'}).click()
})