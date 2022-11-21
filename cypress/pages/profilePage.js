import TestUtils from '../utils/TestUtils'
import * as CONST from '../utils/constants'

class ProfilePage {

    elements = {
        userName : () => cy.get('.UserCard-profile .username'),
        userStatus : () => cy.get('.UserCard-lastSeen'),
        userBioInput : () => cy.get('.UserBio').click().children(),
        userBio : () => cy.get('.UserBio-content')
    }

    isUserNameInUpPart() {
        cy.info('Check username position');
        this.elements.userName().then((el) => {
            cy.checkPosition(el[0].getBoundingClientRect()).should((text) => {
              expect(text).to.be.oneOf([CONST.POSITIONS.LEFT_UP, CONST.POSITIONS.RIGHT_UP]);
            });
        });
    }

    checkUserStatus(status) {
        cy.info('Check user status');
        this.elements.userStatus().invoke('text').should('contain', status);
    }

    getCurrentBioText() {
        cy.info('Get current bio');
        this.elements.userBio().click().invoke('text').then((currentText) => currentText);
    }

    insertBio(text) {
        cy.info('Insert bio');
        this.elements.userBioInput().clear().type(text);
    }

    bioShouldHaveText(text) {     
        if (!TestUtils.isUndefined(text)) {
            cy.info('Check bio text');
            this.elements.userBio().click().invoke('text').should('eq', text); 
        }   
    }
}

module.exports = new ProfilePage();