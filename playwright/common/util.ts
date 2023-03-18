import { Locator } from '@playwright/test';

export async function getAllAttributes(elements: Locator, attribute: string): Promise<string[]> {
    const count = await elements.count();
    const allAttributes: string[] = [];

    for (let index = 0; index < count; index++) {
        const element = await elements.nth(index);
        const elAttribute = await element.getAttribute(attribute);
        allAttributes.push((elAttribute || '').trim().replace(/\s+/g, ' '));
    }

    return allAttributes.filter(Boolean);
}