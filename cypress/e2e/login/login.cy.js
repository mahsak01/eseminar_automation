import LoginPage from '../../pages/LoginPage';
import LandingPage from "../../pages/LandingPage";
import loginPage from "../../pages/LoginPage";

describe('Login tests on eseminar.tv', () => {
    beforeEach(() => {
        cy.fixture('users').as('users');
    });

    it('should login with valid credentials', function () {
        const {email, password} = this.users.validUser;

        LandingPage.openHomePage();
        LandingPage.clickEnterButton();
        LoginPage.assertUrlIs();
        LoginPage.fillEmail(email);
        LoginPage.fillPassword(password);
        LoginPage.submit();

    });

    it('should not login with wrong email', function () {
        const {email, password} = this.users.wrongEmail;

        LandingPage.openHomePage();
        LandingPage.clickEnterButton();
        LoginPage.assertUrlIs();
        LoginPage.fillEmail(email);
        LoginPage.fillPassword(password);
        LoginPage.submit();
        loginPage.assertErrorUserNotFound();

    });

    it('should not login with wrong password', function () {
        const {email, password} = this.users.wrongPassword;

        LandingPage.openHomePage();
        LandingPage.clickEnterButton();
        LoginPage.assertUrlIs();
        LoginPage.fillEmail(email);
        LoginPage.fillPassword(password);
        LoginPage.submit();
        loginPage.assertErrorInvalidCredentials();

    });

    it('should show validation errors for empty fields', function () {

        LandingPage.openHomePage();
        LandingPage.clickEnterButton();
        LoginPage.assertUrlIs();
        LoginPage.submit();
        LoginPage.assertErrorRequiredEmail();
        LoginPage.assertErrorRequiredPassword();

    });
});
