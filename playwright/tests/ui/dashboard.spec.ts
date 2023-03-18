import { test, expect } from '@playwright/test';

const S = {
    pageTitle: '[data-cy="title"]',
};

test('Dashboard', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL('/home');
    await expect(page).toHaveTitle('Todolist');
    await expect(page.locator(S.pageTitle)).toContainText('welcome!');
});