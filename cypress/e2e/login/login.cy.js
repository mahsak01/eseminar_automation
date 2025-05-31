import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import LandingPage from '../pages/LandingPage';

describe('ISeminar Frontend Login and Transactions Test', () => {

    beforeEach(() => {
        cy.fixture('users').as('users');

        LandingPage.openHomePage();
        LandingPage.clickEnterButton();
        LoginPage.assertUrlIs();
    });

    it('Verify that user is on the login page', () => {
        LoginPage.assertUrlIs();
    });

    it('should not login with wrong email', function () {
        const {email, password} = this.users.wrongEmail;
        LoginPage.fillEmail(email);
        LoginPage.fillPassword(password);
        LoginPage.submit();
        LoginPage.assertErrorUserNotFound();
    });

    it('should not login with wrong password', function () {
        const {email, password} = this.users.wrongPassword;
        LoginPage.fillEmail(email);
        LoginPage.fillPassword(password);
        LoginPage.submit();
        LoginPage.assertErrorInvalidCredentials();
    });

    it('should show validation errors for empty fields', function () {

        LoginPage.submit();
        LoginPage.assertErrorRequiredEmail();
        LoginPage.assertErrorRequiredPassword();
    });


    it('Verify user is on dashboard after login', () => {
        const {email, password} = this.users.validUser;

        LoginPage.fillEmail(email);
        LoginPage.fillPassword(password);
        LoginPage.submit();
        DashboardPage.assertIsOnDashboard();
    });

});
