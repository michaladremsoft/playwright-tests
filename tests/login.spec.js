const { test, expect } = require('@playwright/test');

test.describe('Login tests', () => {
  test('valid login', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.locator('button[type="submit"]').click();

    await expect(page.locator('#flash')).toContainText('WRONG TEXT');
    await expect(page).toHaveURL(/secure/);
  });

  test('invalid password shows error', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('wrongpassword');
    await page.locator('button[type="submit"]').click();

    await expect(page.locator('#flash')).toContainText('Your password is invalid!');
  });
});