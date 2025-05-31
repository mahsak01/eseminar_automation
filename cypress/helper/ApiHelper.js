// cypress/helpers/apiHelper.js
export class ApiHelper {
    constructor(token) {
        this.token = token;
        this.headers = {
            accept: "application/json, text/plain, */*",
            authorization: `Bearer ${token}`,
            origin: "https://eseminar.tv",
            referer: "https://eseminar.tv/dashboard/my-orders",
            "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36"
        };
    }

    static login(email, password) {
        return cy.request({
            method: 'POST',
            url: 'https://api.eseminar.tv/api/v1/auth/login',
            body: { email, password },
            headers: { accept: "application/json, text/plain, */*", "content-type": "application/json" }
        });
    }

    getOrders() {
        return cy.request({
            method: 'GET',
            url: 'https://api.eseminar.tv/api/v1/user/orders?per_page=10&page=1',
            headers: this.headers
        });
    }

    getOrderDetails(orderId) {
        return cy.request({
            method: 'POST',
            url: `https://api.eseminar.tv/api/v1/user/order/${orderId}`,
            headers: { ...this.headers, "content-length": "0" },
            body: {},
            failOnStatusCode: false,
        });
    }
}
