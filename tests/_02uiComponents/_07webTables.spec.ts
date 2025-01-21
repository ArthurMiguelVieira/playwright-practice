import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();
});

test("web tables", async ({ page }) => {
  // get locator for the row

  const targetRow = page.getByRole("row", { name: "twitter@outlook.com" });
  const editButton = targetRow.locator(".nb-edit");
  //const ageTextBox = targetRow.locator('[placeholder="Age"]')
  const ageTextBox = page.locator("input-editor").getByPlaceholder("Age");
  const confirmButton = targetRow.locator(".nb-checkmark");

  await editButton.click();
  await ageTextBox.clear();
  await ageTextBox.fill("35");
  await confirmButton.click();

  await page.locator(".ng2-smart-pagination-nav").getByText("2").click();

  const targetRowById = page
  .getByRole("row", { name: "11" })
  .filter({ has: page.locator("td").nth(1).getByText("11") });
  await targetRowById.click();
});

test("search user", async ({ page }) => {
  // EXERCÍCIO - Buscar em todas as tabelas um usuário por ID.
  const userId = "38"; // ID do usuário a ser buscado
  let userFound = false; // Flag para indicar se o usuário foi encontrado

  while (!userFound) {
    const nextButton = page
    .locator(".ng2-smart-pagination-nav .ng2-smart-page-item")
    .getByText("Next");
    let nextButtonContainer = page.locator(".ng2-smart-pagination-nav .ng2-smart-page-item",{hasText:'Next'});
    // Procurar o usuário na página atual
    const userRow = page
      .getByRole("row", { name: userId })
      .filter({ has: page.locator("td").nth(1).getByText(userId) });

    // Se o usuário for encontrado, exibir mensagem e sair do loop
    if ((await userRow.count()) > 0) {
      console.log(`Usuário ${userId} encontrado na página atual.`);
      userFound = true;
      break;
    }

    // Verificar se o botão "Next" está desabilitado
    let classNextButton = await nextButtonContainer.getAttribute('class')

    if (classNextButton == 'ng2-smart-page-item page-item disabled') {
      console.log(`Usuário ${userId} não encontrado: última página alcançada.`);
      break;
    }

    // Clicar no botão "Next" para ir para a próxima página
    await nextButton.click();

    // Esperar a próxima página carregar (caso necessário)
    await page.waitForTimeout(500);
  }
});



test("test filter of the table", async ({ page }) => {
  const ages = ["20", "30", "40", "200"];

  for (let age in ages) {
    await page.locator("input-filter").getByPlaceholder("Age").clear;
    await page.locator("input-filter").getByPlaceholder("Age").fill(ages[age]);
    await page.waitForTimeout(500);
    const ageRows = await page.locator("tbody tr").all();
    for (let row of ageRows) {
      const cellValue = await row.locator("td").last().textContent();
      if(ages[age] == '200'){
        expect(await page.getByRole('table').textContent()).toContain('No data found')
      }else{
        expect(cellValue).toEqual(ages[age]);
      }
      
    }
  }
});
