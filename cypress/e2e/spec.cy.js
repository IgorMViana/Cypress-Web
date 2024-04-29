describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://walkdog.vercel.app/')
    cy.get('a')
      .click()

    cy.url().should('contain', 'signup')

    cy.get('h1')
      .should('have.text', 'Faça seu cadastro')

    cy.get('input[name=name]')
      .type('Igor Mattos Viana')

    cy.get('input[name=email]')
      .type('igormv29@gmail.com')

    cy.get('input[name=cpf]')
      .type('06233301564')

    cy.get('input[name=cep]')
      .type('40270200')

    cy.intercept('https://viacep.com.br/ws/40270200/json/').as('getAddress')
    cy.get('input[type=button]')
      .click()
    cy.wait('@getAddress').then(() => {
      cy.get('input[name=addressStreet]')
        .should('have.value', 'Rua Doutor Mário Rego dos Santos')

      cy.get('input[name=addressDistrict]')
        .should('have.value', 'Vila Laura')

      cy.get('input[name=addressCityUf]')
        .should('have.value', 'Salvador/BA')
    })

    cy.get('input[name=addressNumber]')
      .type('314')

    cy.get('input[name=addressDetails]')
      .type('APTO 603')

    cy.get('img[alt=Cuidar]')
      .click()

    cy.get('img[alt=Adestrar]')
      .click()

    cy.get('input[type=file]')
      .selectFile('./cypress/fixtures/CNH_Template.jpg', { force: true })

    cy.get('button[type=submit]').click()

  })
})