class DashboardPage {
    visit() {
        cy.visit('/dashboard');
    }

    assertIsOnDashboard() {
        cy.url().should('eq', 'https://eseminar.tv/dashboard');
        cy.get('h1.title').should('contain.text', 'پنل کاربری');
    }

    goToTransactionsPage() {
        cy.contains('a.text-base', 'لیست تراکنش‌ها').click();
        cy.url().should('include', '/dashboard/my-orders');
    }

    selectFirstTransaction() {
        // انتخاب اولین ردیف تراکنش در tbody
        return cy.get('table.es__table tbody tr').first().as('selectedTransaction');
    }

    interceptTransactionApi(transactionId) {
        cy.intercept('GET', `/api/transactions/${transactionId}`, (req) => {
            req.continue((res) => {
                cy.wrap(res.body).as('transactionData');
            });
        }).as('fetchTransaction');
    }

    openTransactionDetails() {
        // کلیک روی دکمه "مشاهده جزئیات" داخل ردیف انتخاب شده
        cy.get('@selectedTransaction').find('button.es__btnItem').contains('مشاهده جزئیات').click();
    }

    assertLoadingSpinnerVisible() {
        cy.get('div.v-spinner').should('be.visible');
    }

    waitForTransactionData() {
        cy.wait('@fetchTransaction');
    }

    assertLoadingSpinnerNotVisible() {
        cy.get('div.v-spinner').should('not.exist');
    }

    assertTransactionDetailsModalVisible() {
        cy.get('div.modal-dialog.modal-lg').should('be.visible');
    }

    assertTransactionDetailsMatchApi() {
        cy.get('@transactionData').then((data) => {
            cy.get('.modal-order-id').should('have.text', data.id);
            cy.get('.modal-customer-name').should('have.text', data.customerName);
            cy.get('.modal-amount').should('have.text', data.amount.toString());
            // اگر فیلدهای بیشتر بود اضافه کنید
        });
    }

    openAndValidateFirstTransactionDetails() {
        this.selectFirstTransaction().invoke('attr', 'data-id').then((transactionId) => {
            this.interceptTransactionApi(transactionId);
            this.openTransactionDetails();
            this.assertLoadingSpinnerVisible();
            this.waitForTransactionData();
            this.assertLoadingSpinnerNotVisible();
            this.assertTransactionDetailsModalVisible();
            this.assertTransactionDetailsMatchApi();
        });
    }
}

export default new DashboardPage();
