class profilePage {

    elements = {
        userName : () => cy.get('.UserCard-profile .username'),
        userStatus : () => cy.get('.UserCard-lastSeen'),
        userBioInput : () => cy.get('.UserBio').click().children(),
        userBio : () => cy.get('.UserBio-content')
    }

    isUserNameInUpPart() {
        cy.task('log','Check username position');
        this.elements.userName().then((el) => {
            cy.checkPosition(el[0].getBoundingClientRect()).should((text) => {
              expect(text).to.be.oneOf(['LeftUp', 'RightUp']);
            });
        });
    }

    isUserOnline() {
        cy.task('log','Check user status');
        this.elements.userStatus().then((element) => 
            expect(element.text().trim()).to.equal('Online'));
    }

    getCurrentBioText() {
        cy.task('log','Get current bio');
        this.elements.userBio().click().invoke('text').then((currentText) => currentText);
    }

    insertBio(text) {
        cy.task('log','Insert bio');
        this.elements.userBioInput().clear().type(text);
    }

    bioShouldHaveText(text) {     
        if (!typeof(text) == 'undefined') {
            cy.task('log','Check bio text');
            this.elements.userBio().click().invoke('text').then((currentText) => {
                expect(currentText).to.equal(text);           
            }); 
        }   
    }
}
export default profilePage