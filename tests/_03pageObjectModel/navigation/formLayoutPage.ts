import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutPage extends HelperBase{

    constructor(page:Page){
        super(page)
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email:string,password:string,optionText:string){
        const usingTheGridForm = this.page.locator('nb-card',{hasText:"Using the Grid"})
        await usingTheGridForm.getByRole('textbox',{name:"Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox',{name:"Password"}).fill(password)
        await usingTheGridForm.getByRole('radio',{name:optionText}).check({force:true})
        await usingTheGridForm.getByRole('button').click()
    }
    /**
     * Esse metodo preenche o formulario Inline com os detalhes do usuario
     * @param name  - deve ser primeiro e ultimo nome
     * @param email - email valido 
     * @param rememberMe - true ou falso para salvar sessão do usuario
     */
    async submitInLineFormWithNameEmailAndCheckbox(name:string,email:string,rememberMe:boolean){
        const inlineForm = this.page.locator('nb-card',{hasText:"Inline form"})
        await inlineForm.getByRole('textbox',{name:"Jane Doe"}).fill(name)
        await inlineForm.getByRole('textbox',{name:"Email"}).fill(email)
        if(rememberMe){
            await inlineForm.getByRole('checkbox').check({force:true})
        }
       await inlineForm.getByRole('button').click()
    }
}