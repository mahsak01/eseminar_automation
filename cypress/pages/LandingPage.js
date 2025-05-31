class LandingPage {
    openHomePage() {
        cy.visit('https://eseminar.tv');
    }
    clickEnterButton() {
        cy.get('a[href="/login"].d-none.d-md-inline').click();
    }
}

export default new LandingPage();
