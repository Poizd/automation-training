import { test, expect } from '@playwright/test';

const S = {
    pageTitle: '[data-cy="title"]',
    todoInput: '[data-cy="todo-text"]',
    todoItem: '[data-cy="todo-item"]',
    todoItemLabel: '[data-cy="label"]',
    editTodoText: '[data-cy="edit-text"]',
    addTodoBtn: '[data-cy="add-btn"]',
    editTodoBtn: '[data-cy="edit-btn"]',
    saveTodoBtn: '[data-cy="save-btn"]',
    deleteTodoBtn: '[data-cy="delete-btn"]',
    checkBox: '.p-checkbox-box',
    activeCheckBox: 'p-checkbox-box p-highlight p-focus',
    allItemsBtn: '[ng-reflect-label="All"]',
    activeItemsBtn: '[ng-reflect-label="Active"]',
    innactiveItemsBtn: '[ng-reflect-label="Inactive"]',
};

const TODO_ITEMS = [
    'item 1',
    'item 2',
    'item 3',
    'item 4',
];

test.describe('Todo', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/todo');
    });

    test('Verify page title', async ({ page }) => {
        await expect(page.locator(S.pageTitle)).toContainText('Todo list');
    });

    test('Add 4 todo items', async ({ page }) => {
        await page.locator(S.todoInput).fill('item 1');
        await page.locator(S.addTodoBtn).click();

        await page.locator(S.todoInput).fill('item 2');
        await page.locator(S.addTodoBtn).click();

        await page.locator(S.todoInput).fill('item 3');
        await page.locator(S.addTodoBtn).click();

        await page.locator(S.todoInput).fill('item 4');
        await page.locator(S.addTodoBtn).click();

        const todoItems = await page.locator(S.todoItem).count();

        await expect(todoItems).toBe(4);
    });

    test('Edit todo item', async ({ page }) => {
        const newText = 'New Text';

        await page.locator(S.todoInput).fill('item 1');
        await page.locator(S.addTodoBtn).click();

        const firstTodoItem = await page.locator(S.todoItem).nth(0);
        await firstTodoItem.locator(S.editTodoBtn).click();

        await firstTodoItem.locator(S.editTodoText).fill(newText);
        await firstTodoItem.locator(S.saveTodoBtn).click();

        await expect(firstTodoItem).toContainText(newText);
    });

    test('Delete todo item', async ({ page }) => {
        await page.locator(S.todoInput).fill('item 1');
        await page.locator(S.addTodoBtn).click();

        await page.locator(S.todoInput).fill('item 2');
        await page.locator(S.addTodoBtn).click();

        await expect(await page.locator(S.todoItem).count()).toBe(2);

        const firstTodoItem = await page.locator(S.todoItem).nth(0);
        await firstTodoItem.locator(S.deleteTodoBtn).click();

        await expect(await page.locator(S.todoItem).count()).toBe(1);
    });

    //test check inactive filtered items
    test('Active chaxbox item', async ({ page }) => {
        const newTodo = page.locator(S.todoInput);
        const addTodo = page.locator(S.addTodoBtn)
        // Create items.
        for (const item of TODO_ITEMS.slice(0, 4)) {
            await newTodo.fill(item);
            await addTodo.click();
        }
        const firstTodo = page.locator(S.todoItem).nth(0);
        const secondTodo = page.locator(S.todoItem).nth(1);
        const firstTodoCheckbox = firstTodo.locator(S.checkBox);
        await firstTodoCheckbox.click();
        await expect(firstTodoCheckbox).toHaveClass(S.activeCheckBox);
        await expect(secondTodo).not.toHaveClass(S.activeCheckBox);
        await firstTodoCheckbox.click();
        await expect(firstTodo).not.toHaveClass(S.activeCheckBox);
        await expect(secondTodo).not.toHaveClass(S.activeCheckBox);
    })

    test('Verify Active Items', async ({ page }) => {
        const newTodo = page.locator(S.todoInput);
        const addTodo = page.locator(S.addTodoBtn);
        // Create items.
        for (const item of TODO_ITEMS.slice(0, 4)) {
            await newTodo.fill(item);
            await addTodo.click();
        };

        await page.locator(S.todoItem).nth(0).locator(S.checkBox).click();
        await page.locator(S.todoItem).locator(S.checkBox).nth(1).click();

        await page.locator(S.activeItemsBtn).click();

        await expect(page.locator(S.todoItemLabel).nth(0)).toHaveText(TODO_ITEMS[2]);
        await expect(page.locator(S.todoItemLabel).nth(1)).toHaveText(TODO_ITEMS[3]);

    });

    test('Verify Inactive Items', async ({ page }) => {
        const newTodo = page.locator(S.todoInput);
        const addTodo = page.locator(S.addTodoBtn);
        // Create items.
        for (const item of TODO_ITEMS.slice(0, 4)) {
            await newTodo.fill(item);
            await addTodo.click();
        };

        await page.locator(S.todoItem).nth(0).locator(S.checkBox).click();
        await page.locator(S.todoItem).locator(S.checkBox).nth(1).click();

        await page.locator(S.innactiveItemsBtn).click();

        await expect(page.locator(S.todoItemLabel).nth(0)).toHaveText(TODO_ITEMS[0]);
        await expect(page.locator(S.todoItemLabel).nth(1)).toHaveText(TODO_ITEMS[1]);

    });

    test('Verify All Items', async ({ page }) => {
        const newTodo = page.locator(S.todoInput);
        const addTodo = page.locator(S.addTodoBtn);
        // Create items.
        for (const item of TODO_ITEMS.slice(0, 4)) {
            await newTodo.fill(item);
            await addTodo.click();
        };

        await page.locator(S.todoItem).nth(0).locator(S.checkBox).click();
        await page.locator(S.todoItem).locator(S.checkBox).nth(1).click();

        await page.locator(S.allItemsBtn).click();

        await expect(page.locator(S.todoItemLabel).nth(0)).toHaveText(TODO_ITEMS[0]);
        await expect(page.locator(S.editTodoBtn).nth(0)).toHaveAttribute('ng-reflect-disabled', 'true');
        await expect(page.locator(S.todoItemLabel).nth(1)).toHaveText(TODO_ITEMS[1]);
        await expect(page.locator(S.editTodoBtn).nth(1)).toHaveAttribute('ng-reflect-disabled', 'true');
        await expect(page.locator(S.todoItemLabel).nth(2)).toHaveText(TODO_ITEMS[2]);
        await expect(page.locator(S.editTodoBtn).nth(2)).toHaveAttribute('ng-reflect-disabled', 'false');
        await expect(page.locator(S.todoItemLabel).nth(3)).toHaveText(TODO_ITEMS[3]);
        await expect(page.locator(S.editTodoBtn).nth(3)).toHaveAttribute('ng-reflect-disabled', 'false');
    });
});