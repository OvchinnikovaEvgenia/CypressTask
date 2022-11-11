class loginForm {

    elements = {
        usernameInput : () => cy.get('[placeholder = "Username or Email"]'),
        passwordInput : () =>  cy.get('[placeholder = "Password"]'),
        submitButton: () =>  cy.get('[type = "submit"]')
    }

    enterUsername(username) {
        cy.task('log','Enter username');
        this.elements.usernameInput().wait(500).type(username);
    }

    enterPassword(password) {
        cy.task('log','Enter password');
        this.elements.passwordInput().wait(500).type(password);
    }

    clickSubmitButton() {
        cy.task('log','Click submit button');
        this.elements.submitButton().click();
    }
}

export default loginForm