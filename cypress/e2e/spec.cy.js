import testdata from '../fixtures/example.json';
import homePage from '../pages/homePage';
import authorizedHomePage from '../pages/authorizedHomePage';

describe('update bio', () => {
  var authHomePage;
  var userProfilePage;
  beforeEach(function() {
    cy.intercept('POST', '**/login').as('Login');
    cy.intercept('POST', '**/6').as('Load');   
    cy.intercept('POST', `**/api/users/${testdata.expectedResponse.data.id}`, testdata.expectedResponse,).as('NewBio');     
  })

  before(() => {
    cy.task('log','Move to Flarum website');
    cy.visit(testdata.baseUrl); 
  })

  it('Check logo', () => {  
    homePage.isLogoDisplayed();
  })

  it('Login user', function() {
    cy.visit(testdata.baseUrl); 
    homePage.clickLoginButton();
    var loginForm = homePage.switchToLoginForm();
    loginForm.enterUsername(testdata.username);
    loginForm.enterPassword(testdata.password);
    loginForm.clickSubmitButton();
    cy.wait('@Login');
    cy.wait('@Load');
    authHomePage = new authorizedHomePage();
    authHomePage.isUserNameOnTheRight();
  }) 
  
  it('Check user menu', () => {
    authHomePage.clickOnUserProfileButton();
    authHomePage.isDropdownElementsAsExpected(testdata.expectedElements);
  })

  it('Check profile', () => {
    userProfilePage = authHomePage.clickOnProfileButton();
    cy.wait('@Load');
    userProfilePage.isUserNameInUpPart();
    userProfilePage.isUserOnline();
  })

  it('Check changed bio', function() {
    var startText = userProfilePage.getCurrentBioText();
    userProfilePage.insertBio(`${testdata.testBio}{enter}`);
    cy.task('log','Mock bio response');
    cy.wait('@NewBio');
    userProfilePage.bioShouldHaveText(testdata.expectedResponse.data.attributes.bio);
    cy.task('log','Reload page');
    cy.reload();
    cy.wait('@Load');
    userProfilePage.bioShouldHaveText(startText);
  })
})


