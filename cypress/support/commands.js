// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillFormWithCEP', (fixture) => {
    cy.fixture(fixture).then(user => {
        cy.get('input[name=name]').type(user.name);
        cy.get('input[name=email]').type(user.email);
        cy.get('input[name=cpf]').type(user.cpf);

        cy.get('input[name=cep]').type(user.address.zip);

        cy.intercept('https://viacep.com.br/ws/40270200/json/').as('getAddress')
        cy.get('input[type=button]').click(); // Assuming clicking fills address fields
        cy.wait('@getAddress').then((res) => {
            expect(res.response.statusCode).to.equal(200)
        })

        cy.get('input[name=addressStreet]').should('have.value', user.address.street)
        cy.get('input[name=addressDistrict]').should('have.value', user.address.bairro)
        cy.get('input[name=addressCityUf]').should('have.value', user.address.city_state)

        cy.get('input[name=addressNumber]').type(user.address.number)
        cy.get('input[name=addressDetails]').type(user.address.comp)
        cy.get('input[type=file]').selectFile(user.CNH, { force: true })
    })
})

Cypress.Commands.add('fillFormWithoutCEP', (fixture) => {
    cy.fixture(fixture).then(user => {
        cy.get('input[name=name]').type(user.name);
        cy.get('input[name=email]').type(user.email);
        cy.get('input[name=cpf]').type(user.cpf);
        cy.get('input[name=cep]').type(user.address.zip);

        cy.get('input[name=addressNumber]').type(user.address.number)
        cy.get('input[name=addressDetails]').type(user.address.comp)
        cy.get('input[type=file]').selectFile(user.CNH, { force: true })

        cy.get('input[name=cep]').should('have.value', user.address.zip);  // Adjust selector if needed
    })
})

Cypress.Commands.add('testEmptyFields', (fields) => {

    if (!(fields instanceof Array)){
        throw   "ERRO"
    }

    fields.forEach(element => {
        if (element == 'file') cy.get(`input[type=${element}]`).should('be.empty');
        else cy.get(`input[name=${element}`).should('be.empty');
    });


})

Cypress.Commands.add('testAlertErrors', (alertErros) => {

    if (!(alertErros instanceof Array)){
        throw   "ERRO"
    }

    alertErros.forEach(element => {
        cy.xpath(`//span[text()="${element}"]`).should('be.visible')
    });
})