import { test, expect } from '@playwright/test';

set LT_USERNAME="kumarane90"
set LT_ACCESS_KEY="LT_wC7z8yJOz0HCzOYaPp1xbLCwrFHuaJYpyWkXXfI8WsQnOgd"

(async () => {
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Sample Build',
      'name': 'Playwright Sample Test',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true
    }
  }

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

test('Test Scenario 1', async ({ page }) => {

  await page.goto('https://www.testmuai.com/selenium-playground/');

  await page.locator('a[href="https://www.testmuai.com/selenium-playground/simple-form-demo/"]').click();

  const variable = "“Welcome to TestMu AI”";

  await page.getByPlaceholder('Please enter your Message').fill(variable);

  await page.waitForTimeout(3000);
  await page.getByRole('button', {name: 'Get Checked Value'}).click();
  
  
  const  message =  await page.locator('//*[@id="message" and @class="mt-20"]').textContent();
  
  await expect(variable).toEqual(message);

 
});

test('Test Scenario 2', async ({ page }) => {

  await page.goto('https://www.testmuai.com/selenium-playground/');

  await page.locator('a[href="https://www.testmuai.com/selenium-playground/drag-drop-range-sliders-demo/"]').click();

  const slide = await page.locator('//*[@id="slider3"]/div/input');
  let currentSlideValue = "15";
  const targetSlideValue = "95";

  for (currentSlideValue; currentSlideValue < targetSlideValue; currentSlideValue++) {
  await slide.press('ArrowRight');
}
 await page.waitForTimeout(3000);
 const slidevalue = await page.locator('//*[@id="rangeSuccess"]').textContent();
 await expect(slidevalue).toEqual(targetSlideValue);

});


test('Test Scenario 3', async ({ page }) => {

  await page.goto('https://www.testmuai.com/selenium-playground/');

  await page.locator('a[href="https://www.testmuai.com/selenium-playground/input-form-demo/"]').click();

  await page.locator('//button[text()="Submit"]').click();
  
  const errorMessage = "Please fill out this field.";
  
  const validationMessage = await page.$eval('input[name="name"]', element => element.validationMessage);
  
  await expect(validationMessage).toEqual(errorMessage);

  page.locator("#name").fill("Bruce Wayne");
  page.getByLabel("Email*").fill("batman@gotham.com");
  page.getByPlaceholder("Password").fill("Martha");
  page.locator("#company").fill("Wayne Enterprises");
  page.locator("#websitename").fill("www.batman.com");
        
  page.locator("select[name='country']").selectOption("United States");
        
  page.locator("input[name='city']").fill("Gotham");
  page.getByPlaceholder("Address 1").fill("Arkham");
  page.getByPlaceholder("Address 2").fill("Asylum");
  page.locator("input[placeholder='State']").fill("united states");
  page.locator("input[name='zip']").fill("50325");
  await page.locator('//button[text()="Submit"]').click();

  const successMessage = await page.locator('//*[@class="success-msg hidden"]').textContent();

  
 //  '//*[@class="success-msg hidden"]'
  const expectedMessage = 'Thanks for contacting us, we will get back to you shortly.';
  await expect(successMessage).toEqual(expectedMessage);

});
