import * as CONST from '../utils/constants'

class AuthorizedHomePage{
    elements = {
        userProfileButton : () => cy.get('.username').first(),
        profileDropdown : () => cy.get('ul.Dropdown-menu--right .Button-label'),
        profileButton : () => cy.get('.item-profile')
    }

    isUserNameOnTheRight() {
        cy.info('Check username position');
        this.elements.userProfileButton().then((el) => {
            cy.checkPosition(el[0].getBoundingClientRect())
            .should('eq', CONST.POSITIONS.RIGHT_UP);
        })
    }

    clickOnUserProfileButton() {
        cy.info('Click user profile button');
        this.elements.userProfileButton().click();
    }

    isDropdownElementsAsExpected(expectedElements) {
        cy.info('Check dropdown elements');
       this.elements.profileDropdown().then((elements) => {
            let itemsText = Array.from(elements, el => el.innerText).sort();
            let expectedItems = Array.from(expectedElements).sort();
            expect(itemsText).to.deep.eq(expectedItems);
        })
    }

    clickOnProfileButton() {
        cy.info('Click profile button');
        this.elements.profileButton().click();
    }
}

module.exports = new AuthorizedHomePage();