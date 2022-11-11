import loginForm from '../pages/forms/loginForm';

class homePage{

    elements = {
        loginButton : () => cy.get('.item-logIn>button'),
        pageLogo : () => cy.get('.Header-logo')
    }

    isLogoDisplayed() {
        cy.task('log','Check is logo visible');
        this.elements.pageLogo().should('be.visible');
    }

    clickLoginButton() {
        cy.task('log','Click login button');
        this.elements.loginButton().click();
    }

    switchToLoginForm() {
        return new loginForm();
    }
}

module.exports = new homePage();