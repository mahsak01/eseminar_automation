class LoginPage {
    visit() {
        cy.visit('https://eseminar.tv/login');
    }

    fillEmail(email) {
        cy.get('#formEmail').clear().type(email);
    }

    fillPassword(password) {
        cy.get('#formPassword').clear().type(password);
    }

    submit() {
        cy.get('button[type="submit"]').click();
    }
    assertUrlIs() {
        cy.url().should('eq', 'https://eseminar.tv/login');
    }
}

export default new LoginPage();
