describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Satsuma',
      username: 'satsuma',
      password: 'turtleturtle'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('login').click()
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('satsuma')
      cy.get('#password').type('turtleturtle')
      cy.get('#login-button').click()

      cy.contains('Satsuma logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('satsuma')
      cy.get('#password').type('incorrectturtle')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
      cy.get('html').should('not.contain', 'satsuma logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'satsuma', password: 'turtleturtle' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Citrus Fruits 101')
      cy.get('#author').type('Clementine?')
      cy.get('#url').type('www.citrus.fruit')
      cy.contains('create').click()
      cy.contains('Citrus Fruits 101')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Secondary fruit thoughts',
          author: 'Lime',
          url: 'www.lime.fruit'
        })
      })

      it('its details can be viewed', function () {
        cy.contains('Secondary fruit thoughts')
          .contains('view')
          .click()

        cy.contains('Secondary fruit thoughts')
          .contains('www.lime.fruit')
      })

      it('it can be liked', function () {
        cy.contains('Secondary fruit thoughts')
          .contains('view')
          .click()

        cy.contains('Secondary fruit thoughts')
          .contains('like')
          .click()

        cy.contains('Secondary fruit thoughts')
          .contains('1')
      })

      it('it can be removed', function () {
        cy.contains('Secondary fruit thoughts')
          .contains('view')
          .click()

        cy.contains('Secondary fruit thoughts')
          .contains('remove')
          .click()

        cy.get('html').should('not.contain', 'Secondary fruit thoughts')
      })

    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Secondary fruit thoughts',
          author: 'Lime',
          url: 'www.lime.fruit'
        })
        cy.createBlog({
          title: 'Apples are better than citrus fruits',
          author: 'Apple Lover',
          url: 'www.apple.com'
        })
        cy.createBlog({
          title: 'All Fruits Suck',
          author: 'Scurvy',
          url: 'www.banallfruits.org'
        })
      })

      it('one blogs details can be viewed', function () {
        cy.contains('All Fruits Suck')
          .contains('view')
          .click()

        cy.contains('All Fruits Suck')
          .contains('www.banallfruits.org')
      })

      it('they are shown in order of likes', async function () {

        cy.contains('Secondary fruit thoughts')
          .contains('view')
          .click()

        cy.contains('Secondary fruit thoughts')
          .contains('like')
          .click()

        cy.contains('Secondary fruit thoughts')
          .contains('1')
          .click()

        cy.contains('Secondary fruit thoughts')
          .contains('like')
          .click()

        cy.contains('All Fruits Suck')
          .contains('view')
          .click()

        cy.contains('All Fruits Suck')
          .contains('like')
          .click()

        cy.contains('All Fruits Suck')
          .contains('1')

        cy.get('.blog').eq(0).should('contain', 'Secondary fruit thoughts')
        cy.get('.blog').eq(1).should('contain', 'All Fruits Suck')
        cy.get('.blog').eq(2).should('contain', 'Apples are better than citrus fruits')
      })
    })
  })
})