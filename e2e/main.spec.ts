import { test, expect, ElectronApplication, Page } from '@playwright/test'
const { _electron: electron } = require('playwright')
let window: Page
const screenshotPath = 'e2e/screenshots/'

const KEYWORDS = {
  dashboard: 'Dashboard',
  employees: 'Employees',
  settings: 'Settings',
  about: 'About',
  title: 'Lecturer',
}

test.beforeAll(async () => {
  const electronApp: ElectronApplication = await electron.launch({ args: ['.'] })
  const isPackaged = await electronApp.evaluate(async ({ app }) => {
    // This runs in Electron's main process, parameter here is always
    // the result of the require('electron') in the main app script.
    return app.isPackaged
  })

  expect(isPackaged).toBe(false)

  // Wait for the first BrowserWindow to open and return its Page object
  window = await electronApp.firstWindow()
})

test('should render component correctly on-sidebar-navigate', async () => {
  // converts text to selector, that selector is used to navigate
  //  the sidebar and made sure the text appeared in each sidebar's body content
  const handleRender = async (text: string) => {
    await window.click('#' + text) // selector
    await window.locator('.h4.mb-0.text-white.text-uppercase', { hasText: text }).textContent()
  }

  await handleRender(KEYWORDS.employees)
  await handleRender(KEYWORDS.settings)
  await handleRender(KEYWORDS.about)
  await handleRender(KEYWORDS.dashboard)
})

test.describe('Employee screen test', () => {
  test('add employee', async () => {
    // goto employee screen
    await window.click('#' + KEYWORDS.employees)
    // fill form
    await window.type('#name', 'John Doe')
    await window.type('#email', 'jdoe123@gmail.com')
    await window.type('#mobile-number', '02456055675')
    await window.type('#department', 'Computer Science')
    // submit
    await window.click(`text=Add ${KEYWORDS.title}`)
  })
  test('delete employee', async () => {
    // goto employee screen
    await window.click('#' + KEYWORDS.employees)
    // delete last employee card
    await window.screenshot({ path: screenshotPath + 'before-delete.png' })
    await window.locator('div.cards-wrapper>div>.front-side>.info-grid>.btns-wrapper>button>>nth=-1', { hasText: 'Delete' }).click()
    await window.screenshot({ path: screenshotPath + 'after-delete.png' })
  })
})

test.describe('Attendance screen test', () => {
  test('add employee', async () => {
    // goto employee screen
    await window.click('#' + KEYWORDS.employees)
    // fill form
    await window.type('#name', 'John Doe')
    await window.type('#email', 'jdoe123@gmail.com')
    await window.type('#mobile-number', '02456055675')
    await window.type('#department', 'Computer Science')
    // submit
    await window.click(`text=Add ${KEYWORDS.title}`)
  })
  test('delete employee', async () => {
    // goto employee screen
    await window.click('#' + KEYWORDS.employees)
    // delete last employee card
    await window.screenshot({ path: screenshotPath + 'before-delete.png' })
    await window.locator('div.cards-wrapper>div>.front-side>.info-grid>.btns-wrapper>button>>nth=-1', { hasText: 'Delete' }).click()
    await window.screenshot({ path: screenshotPath + 'after-delete.png' })
  })
})
