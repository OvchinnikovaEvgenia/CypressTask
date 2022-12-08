import * as CONST from '../utils/constants'

Cypress.Commands.add('checkPosition', (rect) => { 
    const halfTheValue = 2;
    let centerX = Cypress.config().viewportWidth/halfTheValue;
    let centerY = Cypress.config().viewportHeight/halfTheValue;
    let currentX = rect[CONST.COORDINATES.X];
    let currentY = rect[CONST.COORDINATES.Y];
    if ((currentX < centerX) && (currentY < centerY)) {
        return CONST.POSITIONS.LEFT_UP;
    };
    if ((currentX > centerX) && (currentY < centerY)) {
        return CONST.POSITIONS.RIGHT_UP;
    };
    if ((currentX > centerX) && (currentY > centerY)) {
        return CONST.POSITIONS.RIGHT_DOWN;
    };
    if ((currentX < centerX) && (currentY > centerY)) {
        return CONST.POSITIONS.LEFT_DOWN;
    };
 });

 Cypress.Commands.add('info', (message) => { 
    cy.task('log', message);
 });



