class LoginPage {
    visit() {
        cy.visit('/login');
    }

    fillEmail(email) {
        cy.get('#formEmail').clear().type(email).should('have.value', email);
    }

    fillPassword(password) {
        cy.get('#formPassword').clear().type(password).should('have.value', password);
    }

    submit() {
        cy.contains('button[type="submit"]', 'ورود').click();
        cy.wait(100);
    }

    assertUrlIs() {
        cy.url().should('eq', 'https://eseminar.tv/login');
        cy.wait(100);
    }

    assertErrorMessage(expectedText) {
        cy.get('.es__formElm-error')
            .should('be.visible')
            .and('contain.text', expectedText);
    }

    assertErrorInvalidCredentials() {
        this.assertErrorMessage('ایمیل و یا رمز عبور شما اشتباه است.');
    }

    assertErrorRequiredEmail() {
        this.assertErrorMessage('وارد کردن فیلد ایمیل الزامی است.');
    }

    assertErrorRequiredPassword() {
        this.assertErrorMessage('وارد کردن فیلد رمز عبور الزامی است.');
    }

    assertErrorUserNotFound() {
        this.assertErrorMessage('شما حساب کاربری ندارید لطفا ابتدا عضو سایت شوید.');
    }
}

export default new LoginPage();
