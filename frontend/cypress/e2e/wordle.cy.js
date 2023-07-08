/* global cy */

describe('Wordle app basic functions', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3001')
  })
  it('main page can be opened', function () {
    cy.contains('wordle')
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

  it('help modal can be opened', function () {
    cy.get('#help-button').click()
    cy.contains('How to play')
  })
  it('stats modal has right content when not logged in', function () {
    cy.get('#stats-button').click()
    cy.contains(`Looks like you aren't logged in.`)
  })

  it('settings modal can be opened', function () {
    cy.get('#settings-button').click()
    cy.contains(`Dark Mode`)
  })

  it('Dark Mode toggle works', function () {
    cy.get('#settings-button').click()
    cy.get('[id="Dark Mode-toggle"]').click()
    cy.get('#title').should($title => {
      const textColor = $title.css('color')
      expect(textColor).to.equal('rgb(0, 0, 0)')
    })
    cy.get('[id="Dark Mode-toggle"]').click()
    cy.get('#title').should($title => {
      const textColor = $title.css('color')
      expect(textColor).to.equal('rgb(255, 255, 255)')
    })
  })
})

describe('Wordle app user account functions', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'testuser',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3001')
  })
  it('user can login', function () {
    cy.get('#login-button').click()
    cy.get('#username-form').type('testuser')
    cy.get('#password-form').type('secret')
    cy.get('#inputform-button').click()
    cy.get('#logout-button').should('exist')
  })

  it('user can logout', function () {
    cy.get('#login-button').click()
    cy.get('#username-form').type('testuser')
    cy.get('#password-form').type('secret')
    cy.get('#inputform-button').click()
    cy.get('#logout-button').should('exist')
    cy.get('#logout-button').click()
    cy.get('#logout-button').should('not.exist')
  })

  it('user can create an account', function () {
    cy.get('#signup-button').click()
    cy.get('#username-form').type('testuser2')
    cy.get('#password-form').type('secret')
    cy.get('#inputform-button').click()
    cy.get('#logout-button').should('exist')
  })

  it('user can change username', function () {
    cy.get('#login-button').click()
    cy.get('#username-form').type('testuser')
    cy.get('#password-form').type('secret')
    cy.get('#inputform-button').click()
    cy.get('#user-button').click()
    cy.get('#change-username-button').click()
    cy.get('#new-username-form').type('testuser3')
    cy.get('#save-newusername-button').click()
    cy.get('#save-newusername-button').should('not.exist')
    cy.contains('testuser3')
  })

  it.only('user can delete account', function () {
    cy.get('#login-button').click()
    cy.get('#username-form').type('testuser')
    cy.get('#password-form').type('secret')
    cy.get('#inputform-button').click()
    cy.get('#user-button').click()
    cy.get('#delete-account-button').click()
    cy.on('window:confirm', () => true)
    cy.on('window:confirm', () => true)
    cy.get('#logout-button').should('not.exist')
  })

  it('stats modal shows right content when logged in', function () {
    cy.get('#login-button').click()
    cy.get('#username-form').type('testuser')
    cy.get('#password-form').type('secret')
    cy.get('#inputform-button').click()
    cy.get('#stats-button').click()
    cy.contains('played')
  })

  it('stats update after playing when logged in', function () {
    cy.get('#login-button').click()
    cy.get('#username-form').type('testuser')
    cy.get('#password-form').type('secret')
    cy.get('#inputform-button').click()
    cy.get('#s-key').click()
    cy.get('#t-key').click()
    cy.get('#o-key').click()
    cy.get('#u-key').click()
    cy.get('#t-key').click()
    cy.get('#enter-key').click()
    cy.contains('100%')
  })
})
