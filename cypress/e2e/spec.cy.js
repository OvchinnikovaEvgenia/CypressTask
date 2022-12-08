import testdata from '../fixtures/example.json';
import homePage from '../pages/HomePage';
import authHomePage from '../pages/AuthorizedHomePage';
import userProfilePage from '../pages/ProfilePage'

describe('Update bio', () => {
  beforeEach(function() {
    cy.intercept('POST', '**/login').as('Login');
    cy.intercept('POST', '**/6').as('Load');      
  })

  it('Should update bio', () => {  
    cy.info('Step 1: Move to Flarum website');
    cy.visit(testdata.baseUrl); 
    homePage.isLogoDisplayed();
    cy.info('Step 2: Login uset');
    homePage.clickLoginButton();
    homePage.loginForm.enterUsername(testdata.username);
    homePage.loginForm.enterPassword(testdata.password);
    homePage.loginForm.clickSubmitButton();
    cy.wait('@Login');
    cy.wait('@Load');
    authHomePage.isUserNameOnTheRight();
    cy.info('Step 3: Click on user name');
    authHomePage.clickOnUserProfileButton();
    authHomePage.isDropdownElementsAsExpected(testdata.expectedElements);
    cy.info('Step 4: Click on profile menu item');
    authHomePage.clickOnProfileButton();
    cy.wait('@Load');
    userProfilePage.isUserNameInUpPart();
    userProfilePage.checkUserStatus(testdata.expectedStatus);
    cy.info('Step 5: Update user bio');
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
    cy.info('Step 6: Reload page');
    cy.reload();
    cy.wait('@Load');
    userProfilePage.bioShouldHaveText(startText);
  })
})


