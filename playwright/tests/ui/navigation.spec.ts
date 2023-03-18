import { test, expect } from '@playwright/test';
import { getAllAttributes } from 'playwright/common/util'

const S = {
    menuLink: '.p-menuitem-link',
};

test('Navigation', async ({ page }) => {
    await page.goto('/');

    const menuTexts = await page.locator(S.menuLink).allInnerTexts();
    const menuLinks = await getAllAttributes(page.locator(S.menuLink), 'href');

    await expect(menuTexts).toEqual(['Home', 'Todo list', 'Posts', 'Gallery', 'About']);
    await expect(menuLinks).toEqual(['/home', '/todo', '/posts', '/gallery', '/about']);
});