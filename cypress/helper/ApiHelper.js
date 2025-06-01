export class ApiHelper {
    constructor(token) {
        this.token = token;
        this.headers = {
            Accept: "application/json, text/plain, */*",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36"
        };
    }

    static login(email, password) {
        return cy.request({
            method: 'POST',
            url: 'https://api.eseminar.tv/api/v1/login',
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36"
            },
            body: { email, password }
        });
    }

    getOrders() {
        return cy.request({
            method: 'GET',
            url: 'https://api.eseminar.tv/api/v1/user/orders?per_page=10&page=1',
            headers: this.headers,
            auth: { bearer: this.token }
        });
    }

    getOrderDetails(orderId) {
        return cy.request({
            method: 'POST',
            url: `https://api.eseminar.tv/api/v1/user/order/${orderId}`,
            headers: {
                ...this.headers,
                "Content-Length": "0"
            },
            body: {},
            auth: { bearer: this.token }
        });
    }
}
