import {test,expect} from "@playwright/test";
import { PageManager } from "./navigation/pageManager";

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200/')
})

test('navigation to form page',async({page})=>{
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutPage()
    await pm.navigateTo().datepickePage( )
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods',async({page})=>{
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutPage()
    await pm.formLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com','Welcome','Option 1')
    await pm.formLayoutsPage().submitInLineFormWithNameEmailAndCheckbox('John Snow','john@got.com',true)
    await pm.navigateTo().datepickePage()
    await pm.onDatepickePage().selectCommonDatePickerDateFromToday(5)

    await pm.onDatepickePage().selectDatepickerWithRangeFromToday(0,15)
})