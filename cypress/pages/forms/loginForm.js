import testdata from '../../fixtures/example.json';

class LoginForm {

    elements = {
        usernameInput : () => cy.get('[placeholder = "Username or Email"]'),
        passwordInput : () =>  cy.get('[placeholder = "Password"]'),
        submitButton: () =>  cy.get('[type = "submit"]')
    }

    enterUsername(username) {
        cy.info('Enter username');
        //used wait here because the caret moves before all the data is entered
        this.elements.usernameInput().wait(testdata.timeoutTime).type(username);
    }

    enterPassword(password) {
        cy.info('Enter password');
        //used wait here because the caret moves before all the data is entered
        this.elements.passwordInput().wait(testdata.timeoutTime).type(password);
    }

    clickSubmitButton() {
        cy.info('Click submit button');
        this.elements.submitButton().click();
    }
}

export default LoginForm