describe('TODO App', () => {
  const S = {
    title: '[data-cy="title"]',
    todoItem: '[data-cy="todo-item"]',
    

  };

  it('Go to welcome page', () => {
    cy.visit('http://localhost:4200');
    cy.get(S.title).should('have.text', 'welcome!');

    cy.url().should('include', '/home');
  });

  it('Navigation check ', () => {
    cy.visit('http://localhost:4200');

    cy.get(`[data-automationid="home-page"]`).should('have.text', 'Home').should('have.attr', 'href', '/home');
    cy.get(`[data-automationid="todo-page"]`).should('have.text', 'Todo list').should('have.attr', 'href', '/todo');
    cy.get(`[data-automationid="posts-page"]`).should('have.text', 'Posts').should('have.attr', 'href', '/posts');
    cy.get(`[data-automationid="gallery-page"]`).should('have.text', 'Gallery').should('have.attr', 'href', '/gallery');
    cy.get(`[data-automationid="about-page"]`).should('have.text', 'About').should('have.attr', 'href', '/about');
  });
  it('Check titles', () => {
    cy.visit('http://localhost:4200');

    cy.get(`[data-automationid="home-page"]`).click();
    cy.get(`[data-cy="title"]`).should('have.text', 'welcome!');
    cy.get(`[data-automationid="todo-page"]`).click();
    cy.get(`[data-cy="title"]`).should('have.text', 'Todo list');
    cy.get(`[data-automationid="posts-page"]`).click();
    cy.get(`[data-cy="title"]`).should('have.text', 'Posts');
    cy.get(`[data-automationid="gallery-page"]`).click();
    cy.get(`[data-cy="title"]`).should('have.text', 'Gallery');
    cy.get(`[data-automationid="about-page"]`).click();
    cy.get(`[data-cy="title"]`).should('have.text', 'About');
  });

  it('Todo items', () => {
    cy.visit('http://localhost:4200/todo');

    cy.get('[data-cy="todo-text"]').type('item 1');
    cy.get('[data-cy="add-btn"]').click();

    cy.get('[data-cy="todo-text"]').type('item 2');
    cy.get('[data-cy="add-btn"]').click();

    cy.get(S.todoItem).should('have.length', 2);
  });

  it('Delete item', () => {
    cy.visit('http://localhost:4200/todo');

    cy.get('[data-cy="todo-text"]').type('item 1');
    cy.get('[data-cy="add-btn"]').click();

    cy.get('[data-cy="todo-text"]').type('item 2');
    cy.get('[data-cy="add-btn"]').click();

    cy.get('[data-cy="delete-btn"]').first().click();

    cy.get(S.todoItem).should('have.length', 1);

  });

    it('Chane title of first item', () => {
    cy.visit('http://localhost:4200/todo');

    cy.get('[data-cy="todo-text"]').type('item 1');
    cy.get('[data-cy="add-btn"]').click();

    cy.get('[data-cy="todo-text"]').type('item 2');
    cy.get('[data-cy="add-btn"]').click();

    cy.get('[data-cy="edit-btn"]').first().click();
    cy.get('[data-cy="edit-text"]').type(' EDITED');
    cy.get('[data-cy="save-btn"]').click();


    cy.get('[for="1"]').should('have.text', 'item 1 EDITED');

  });

});