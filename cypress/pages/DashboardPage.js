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
        return cy.get('table.es__table tbody tr').first().as('selectedTransaction');
    }

    openTransactionDetails() {
        cy.get('@selectedTransaction').find('button.es__btnItem').contains('مشاهده جزئیات').click();
    }

    assertLoadingSpinnerVisible() {
        cy.get('div.v-spinner').should('be.visible');
        cy.wait(500);
    }

    assertLoadingSpinnerNotVisible() {
        cy.get('div.v-spinner').should('not.exist');
    }

    assertTransactionDetailsModalVisible() {
        cy.get('div.modal-dialog.modal-lg').should('be.visible');
    }
    checkDetailTransaction(detailBody) {
        // Get the first transaction object from the data array
        const transaction = detailBody.data[0];
        // Get the first item in the transaction's items array
        const item = transaction.items[0];

        // Check the transaction status text on the page
        cy.contains('وضعیت:')
            .parent()
            .should('contain.text', transaction.status_title);

        // Check the transaction ID or show '----' if null
        const transactionId = transaction.transaction_id || '----';
        cy.contains('شماره تراکنش:')
            .parent()
            .should('contain.text', transactionId);

        // Check the payment method (in JSON it is the bank field)
        cy.contains('روش پرداخت:')
            .parent()
            .should('contain.text', transaction.bank);

        // Check the payment reference ID or show '----' if null
        const refId = transaction.ref_id || '----';
        cy.contains('شناسه پرداخت:')
            .parent()
            .should('contain.text', refId);

        // Check the payment gateway (in JSON it is the method field)
        cy.contains('درگاه پرداخت:')
            .parent()
            .should('contain.text', transaction.method);

        // Check the tracking code or show '----' if null
        const trackingCode = transaction.tracking_code || '----';
        cy.contains('کد رهگیری:')
            .parent()
            .should('contain.text', trackingCode);

        // Check the currency displayed
        cy.contains('ارز:')
            .parent()
            .should('contain.text', transaction.currency);


        // Now verify webinar details inside the order detail section
        cy.get('.es__orderDetailModule-contentItem').within(() => {
            // Check the webinar title
            cy.contains('مشخصات وبینار')
                .parent()
                .should('contain.text', item.webinar);

            // Check the webinar teacher's name
            cy.contains('مدرس')
                .parent()
                .should('contain.text', item.teacher);

            // Check the price - if zero, display 'رایگان' (Free)
            const priceText = item.price === 0 ? 'رایگان' : item.price.toString();
            cy.contains('قیمت')
                .parent()
                .should('contain.text', priceText);
        });
    }


}

export default new DashboardPage();
