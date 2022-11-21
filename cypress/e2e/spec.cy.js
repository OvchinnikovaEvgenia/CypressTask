import testdata from '../fixtures/example.json';
import homePage from '../pages/HomePage';
import authHomePage from '../pages/AuthorizedHomePage';
import userProfilePage from '../pages/ProfilePage'

describe('Update bio', () => {
  beforeEach(function() {
    cy.intercept('POST', '**/login').as('Login');
    cy.intercept('POST', '**/6').as('Load');      
  })

  it('Check logo', () => {  
    cy.info('Move to Flarum website');
    cy.visit(testdata.baseUrl); 
    homePage.isLogoDisplayed();
  })

  it('Login user', function() {
    //can login into Flarum only after new visiting to the website
    cy.visit(testdata.baseUrl); 
    homePage.clickLoginButton();
    homePage.loginForm.enterUsername(testdata.username);
    homePage.loginForm.enterPassword(testdata.password);
    homePage.loginForm.clickSubmitButton();
    cy.wait('@Login');
    cy.wait('@Load');
    authHomePage.isUserNameOnTheRight();
  }) 
  
  it('Check user menu', () => {
    authHomePage.clickOnUserProfileButton();
    authHomePage.isDropdownElementsAsExpected(testdata.expectedElements);
  })

  it('Check profile', () => {
    authHomePage.clickOnProfileButton();
    cy.wait('@Load');
    userProfilePage.isUserNameInUpPart();
    userProfilePage.checkUserStatus(testdata.expectedStatus);
  })

  it('Check changed bio', function() {
    cy.intercept('POST', `**/api/users/${testdata.userId}`, (req) => {
      req.continue((res) => {
          res.body.data.attributes.bio = testdata.bio;
      });
    }).as('NewBio');  
    let startText = userProfilePage.getCurrentBioText();
    userProfilePage.insertBio(`${testdata.testBio}{enter}`);
    cy.info('Mock bio response');
    cy.wait('@NewBio');
    userProfilePage.bioShouldHaveText(testdata.bio);
    cy.info('Reload page');
    cy.reload();
    cy.wait('@Load');
    userProfilePage.bioShouldHaveText(startText);
  })
})


