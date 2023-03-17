Cypress.Commands.add('getById', (id) => {
    cy.get('[id=' + id + ']')
})
Cypress.Commands.add('getAndClickById', (id) => {
    cy.get('[id=' + id + ']').click() 
})
Cypress.Commands.add('getAndTypeById', (id, value) => {
    cy.get('[id=' + id + ']').type(value)
})