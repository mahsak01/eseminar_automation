import DashboardPage from '../../pages/DashboardPage';
import LandingPage from "../../pages/LandingPage";
import LoginPage from "../../pages/LoginPage";
import { ApiHelper } from '../../helper/ApiHelper';

describe('Orders API Test', () => {

    beforeEach(function () {
        cy.fixture('users').as('users');
        cy.viewport(1920, 1080);

        LandingPage.openHomePage();
        LandingPage.clickEnterButton();
        LoginPage.assertUrlIs();
    });

    it('Login, get orders and order details', function () {
        const { email, password } = this.users.validUser;

        // UI Login
        LoginPage.fillEmail(email);

        LoginPage.fillPassword(password);

        LoginPage.submit();

        DashboardPage.assertIsOnDashboard();

        DashboardPage.goToTransactionsPage();

        DashboardPage.assertLoadingSpinnerVisible();

        DashboardPage.assertLoadingSpinnerNotVisible();

        DashboardPage.selectFirstTransaction();

        DashboardPage.openTransactionDetails();

        DashboardPage.assertTransactionDetailsModalVisible();

        // API Login and validation
        ApiHelper.login(email, password).then(loginRes => {
            expect(loginRes.status).to.eq(200);

            const token = loginRes.body.data.api_token;
            expect(token, 'Token must exist').to.exist;

            const api = new ApiHelper(token);

            // Get Orders
            api.getOrders().then(ordersRes => {
                expect(ordersRes.status).to.eq(200);
                expect(ordersRes.body.status).to.eq('success');

                const orders = ordersRes.body.data.orders;
                expect(orders).to.be.an('array').and.to.have.length.greaterThan(0);

                // Get Details of Each Order
                orders.forEach(order => {
                    api.getOrderDetails(order.id).then(detailRes => {
                        expect(detailRes.status).to.eq(200);
                        expect(detailRes.body).to.have.property('data');
                        DashboardPage.checkDetailTransaction(detailRes.body);
                    });
                });
            });
        });



    });
});
