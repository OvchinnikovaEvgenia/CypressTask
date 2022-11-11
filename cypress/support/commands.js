// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('checkPosition', (rect) => { 
    let centerX = Cypress.config().viewportWidth/2;
    let centerY = Cypress.config().viewportHeight/2;
    let currentX = rect['x'];
    let currentY = rect['y'];
    if ((currentX < centerX) && (currentY < centerY)) {
        return 'LeftUp';
    };
    if ((currentX > centerX) && (currentY < centerY)) {
        return 'RightUp';
    };
    if ((currentX > centerX) && (currentY > centerY)) {
        return 'RightDown';
    };
    if ((currentX < centerX) && (currentY > centerY)) {
        return 'LeftDown';
    };
 })



