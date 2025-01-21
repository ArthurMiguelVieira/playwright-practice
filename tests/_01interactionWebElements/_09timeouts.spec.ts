import {test,expect} from '@playwright/test';
// Explicação sobre os Timeouts no Playwright:

// 1. globalTimeout (Tempo Limite Global):
// Define o tempo máximo total para a execução de TODOS os testes em uma única execução de `npx playwright test`.
// Se os testes ultrapassarem esse limite, a execução inteira será interrompida, independentemente de testes ainda estarem em andamento.
// Configurado no arquivo de configuração (playwright.config.ts ou playwright.config.js).
// Exemplo:
// globalTimeout: 4000 // Limita a execução total a 4 segundos (não confundir com o timeout de cada teste).

// 2. timeout (Tempo Limite para Testes Individuais):
// Define o tempo máximo permitido para a execução de cada teste individual.
// Se um teste ultrapassar esse limite, ele será interrompido e marcado como falhou.
// Configurado no arquivo de configuração ou diretamente no teste.
// Exemplo:
// timeout: 5000 // Limita cada teste a 5 segundos antes de ser interrompido.

// 3. actionTimeout (Tempo Limite para Ações):
// Define o tempo máximo para ações individuais, como clicar, digitar ou esperar por um elemento.
// Configurado no arquivo de configuração.
// Exemplo:
// actionTimeout: 0 // Sem limite (valor padrão: 0, ou seja, nenhuma restrição para ações).

// 4. navigationTimeout (Tempo Limite de Navegação):
// Define o tempo máximo permitido para eventos de navegação, como `page.goto` ou `page.waitForNavigation`.
// Configurado no arquivo de configuração.
// Exemplo:
// navigationTimeout: 30000 // 30 segundos para navegação (valor padrão).

// 5. expect.timeout (Tempo Limite de Expectativas):
// Define quanto tempo o Playwright deve esperar que uma expectativa (usando `expect`) seja atendida antes de falhar.
// Configurado no arquivo de configuração ou diretamente em um teste.
// Exemplo:
// expect: { timeout: 5000 } // 5 segundos para atender as expectativas antes de falhar.

// NOTAS IMPORTANTES:
// - `globalTimeout` afeta a execução como um todo.
// - `timeout` é aplicado a testes individuais.
// - A combinação desses valores deve ser planejada para evitar interrupções indesejadas na execução dos testes.
