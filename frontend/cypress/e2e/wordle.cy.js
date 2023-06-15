/* global cy */

describe('Wordle app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3001')
  })
  it('main page can be opened', function () {
    cy.contains('Wordle')
  })
  it('letter keys function', function () {
    cy.get('#p-key').click()
    cy.get('#cell-0-0').contains('p')
  })

  it('clear key functions', function () {
    cy.get('#p-key').click()
    cy.get('#cell-0-0').contains('p')
    cy.get('#clear-key').click()
    cy.get('#cell-0-0').should('not.contain', 'p')
  })

  it('enter key functions', function () {
    cy.get('#s-key').click()
    cy.get('#t-key').click()
    cy.get('#o-key').click()
    cy.get('#u-key').click()
    cy.get('#t-key').click()
    cy.get('#enter-key').click()
    cy.get('#cell-0-0').should($cell => {
      const backgroundColor = $cell.css('background-color')
      expect(backgroundColor).to.equal('rgb(83, 141, 78)')
    })
  })
})
