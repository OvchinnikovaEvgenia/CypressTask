import profilePage from '../pages/profilePage';

class authorizedHomePage{
    elements = {
        userProfileButton : () => cy.get('.username').first(),
        profileDropdown : () => cy.get('ul.Dropdown-menu--right .Button-label'),
        profileButton : () => cy.get('.item-profile')
    }

    isUserNameOnTheRight() {
        cy.task('log','Check username position');
        this.elements.userProfileButton().then((el) => {
            cy.checkPosition(el[0].getBoundingClientRect())
            .should('eq', 'RightUp');
        })
    }

    clickOnUserProfileButton() {
        cy.task('log','Click user profile button');
        this.elements.userProfileButton().click();
    }

    isDropdownElementsAsExpected(expectedElements) {
        cy.task('log','Check dropdown elements');
       this.elements.profileDropdown().then((elements) => {
            let itemsText = Array.from(elements, el => el.innerText).sort();
            let expectedItems = Array.from(expectedElements).sort();
            expect(itemsText).to.deep.eq(expectedItems);
        })
    }

    clickOnProfileButton() {
        cy.task('log','Click profile button');
        this.elements.profileButton().click();
        return new profilePage();
    }
}
export default authorizedHomePage