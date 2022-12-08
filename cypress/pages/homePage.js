import LoginForm from './forms/LoginForm';

class HomePage{

    loginForm = new LoginForm();

    elements = {
        loginButton : () => cy.get('.item-logIn>button'),
        pageLogo : () => cy.get('.Header-logo')
    }

    isLogoDisplayed() {
        cy.info('Check is logo visible');
        this.elements.pageLogo().should('be.visible');
    }

    clickLoginButton() {
        cy.info('Click login button');
        this.elements.loginButton().click();
    }
}

module.exports = new HomePage();