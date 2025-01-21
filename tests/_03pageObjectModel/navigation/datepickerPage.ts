import {Page,expect} from '@playwright/test';
import { HelperBase } from './helperBase';

export class DatepickerPage extends HelperBase{
    

    constructor(page:Page){
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday:number){
         const calendarInputField = await this.page
              .locator("nb-card", { hasText: "Common Datepicker" })
              .getByPlaceholder("Form Picker");
          
            calendarInputField.click();
            const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
            
            await expect(calendarInputField).toHaveValue(dateToAssert);
    }

    async selectDatepickerWithRangeFromToday(startDayFromToday:number,endDayFromToday:number){
      const calendarInputField = this.page.getByPlaceholder('Range Picker')
      await calendarInputField.click()
      const startDayFromTodayAssert = await this.selectDateInTheCalendar(startDayFromToday)
      const endDayFromTodayAssert = await this.selectDateInTheCalendar(endDayFromToday)

      const dateToAssert = `${startDayFromTodayAssert} - ${endDayFromTodayAssert}`

      await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday:number){
      let date = new Date()
            date.setDate(date.getDate() + numberOfDaysFromToday)
            const expectedDate = date.getDate().toString()
            const expectedMonthShort = date.toLocaleDateString('En-US',{month:'short'})
            const expectedMonthLong = date.toLocaleDateString('En-US',{month:'long'})
            const expectedYear = date.getFullYear();
            const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
        
            let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
            const expectedMonthAndYear =` ${expectedMonthLong} ${expectedYear} `
        
            while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
              await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
              calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
            }
            await this.page
              .locator('.day-cell.ng-star-inserted')
              .getByText(expectedDate, { exact: true })
              .click();
              
              return dateToAssert;
    }
    

}