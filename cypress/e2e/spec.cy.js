const fields = require("/cypress/fixtures/fields.json")
const alertErrors = require("/cypress/fixtures/alertErrors.json")

describe('Walkdog Pet Sitter Registration', () => {
    it('EMPTY Fields', () => {
        cy.visit('https://walkdog.vercel.app/signup/');

        // Empty fields test
        cy.testEmptyFields(fields)

        cy.get('button[type=submit]').click();

        cy.testAlertErrors(alertErrors)
    })

    it('Invalid EMAIL', () => {
        cy.visit('https://walkdog.vercel.app/signup/');

        // Invalid Email test
        cy.fillFormWithoutCEP('user.json')

        cy.get('input[name=email]').clear().type('invalidEmail');

        cy.get('button[type=submit]').click();

        cy.get('.alert-error').should("have.text", "Informe um email válido").should("be.visible")
    })

    it('Invalid CPF', () => {
        cy.visit('https://walkdog.vercel.app/signup/');

        // Invalid CPF test (assuming CPF length validation)
        cy.fillFormWithoutCEP('user.json')

        cy.get('input[name=cpf]').clear().type('00000000000');
        cy.get('button[type=submit]').click();

        cy.get('.alert-error').should("have.text", "CPF inválido").should("be.visible")
    })

    it('Invalid CEP', () => {
        cy.visit('https://walkdog.vercel.app/signup/');

        // Invalid CEP test (assuming CEP length validation)
        cy.get('input[name=cep]').clear().type('0');
        cy.get('input[type=button]').click();

        cy.get('.alert-error').should("have.text", "Informe um CEP válido").should("be.visible")
    })

    it('ADDRESS', () => {
        cy.visit('https://walkdog.vercel.app/signup/');

        cy.fillFormWithoutCEP('user.json')

        cy.get('input[name=addressNumber]').clear().type('0');
        cy.get('button[type=submit]').click();

        cy.get('.alert-error').should("have.text", "Informe um número maior que zero").should("be.visible")

        cy.get('input[name=addressNumber]').clear().type('-1');
        cy.get('button[type=submit]').click();

        cy.get('.alert-error').should("have.text", "Informe um número maior que zero").should("be.visible")

    })

    it('VALID FORM', () => {
        cy.visit('https://walkdog.vercel.app/signup/');

        // Valid Registration test
        cy.fillFormWithCEP('user.json')

        cy.intercept('https://jsonplaceholder.typicode.com/posts').as('submit')
        cy.get('button[type=submit]').click()
        cy.wait('@submit').then((res) => {
            expect(res.response.statusCode).to.equal(201)
        })

        // Modify assertion based on expected success behavior (confirmation page, message)
        cy.get('.swal2-popup').should('be.visible'); // Replace with appropriate selector
    });
});
