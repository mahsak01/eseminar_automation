import DashboardPage from '../../pages/DashboardPage';
import LandingPage from "../../pages/LandingPage";
import LoginPage from "../../pages/LoginPage";
import { ApiHelper } from '../../helper/ApiHelper';

describe('Orders API Test', function() {
    beforeEach(function() {
        cy.fixture('users').as('users');
        cy.viewport(1920, 1080);

        LandingPage.openHomePage();
        LandingPage.clickEnterButton();
        LoginPage.assertUrlIs();
    });

    it('Login, get orders and order details', function() {
        const { email, password } = this.users.validUser;

        // UI login
        LoginPage.fillEmail(email);
        LoginPage.fillPassword(password);
        LoginPage.submit();
        DashboardPage.assertIsOnDashboard();

        // API login to get token
        ApiHelper.login(email, password).then(loginRes => {
            expect(loginRes.status).to.eq(200);
            const token = loginRes.body.token || loginRes.body.data?.token;
            expect(token).to.exist;

            const api = new ApiHelper(token);

            // Get orders
            api.getOrders().then(ordersRes => {
                expect(ordersRes.status).to.eq(200);
                expect(ordersRes.body.status).to.eq('success');

                const orders = ordersRes.body.data.orders;
                expect(orders).to.be.an('array').and.to.have.length.greaterThan(0);

                // For each order get details
                orders.forEach(order => {
                    api.getOrderDetails(order.id).then(detailRes => {
                        expect(detailRes.status).to.eq(200);
                        expect(detailRes.body).to.have.property('data');
                    });
                });
            });
        });
    });
});
