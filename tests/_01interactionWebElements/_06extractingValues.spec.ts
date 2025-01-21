import {test,expect} from '@playwright/test';

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('extracting values', async ({page})=>{
    const basicForm = page.locator('nb-card',{hasText:'Basic form'})

    //visible text with css
    const buttonText=  await basicForm.getByRole('button').innerText()
    expect(buttonText).toBe('SUBMIT')

    //get the html content
    const buttonText2=  await basicForm.getByRole('button').textContent()
    expect(buttonText2).toBe('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toEqual(["Option 1", "Option 2", "Disabled Option"])
    expect(allRadioButtonsLabels).toContain("Option 1")

    //input value (not a text)
    const emailField = basicForm.getByRole('textbox',{name:'Email'})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toBe('test@test.com')

    const placeholderValueEmail = await emailField.getAttribute('placeholder')
    expect(placeholderValueEmail).toBe('Email')
})