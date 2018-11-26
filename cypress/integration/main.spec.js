describe('Timetable-PLanner ', () => {
  before(() => {
    cy.visit('http://localhost:3000')
    cy.clearLocalStorage()
  })

  describe('Site shows title', () => {
    it('has the right title', () => {
      cy.title().should('include', 'Timetable-Planner')
    })
  })
  describe('Site has the correct headline', () => {
    it('has the right headline', () => {
      cy.get('h1')
        .contains('list of available festivals')
        .should('have.length', 1)
    })
  })

  describe('Main section shows list with all festivals', () => {
    it('shows all festivals', () => {
      cy.get('[data-cy="FestList"]').should('have.length', 1)
    })
  })

  describe('Bookmark festivals', () => {
    it('boomarks first festival', () => {
      cy.get('[data-cy="Bookmark"]')
        .first()
        .click()
    })
    it('boomarks third festival', () => {
      cy.get('[data-cy="Bookmark"]')
        .eq(2)
        .click()
    })
    it('switches to bookmarked list', () => {
      cy.get('[data-cy="NavBarBottomIcon"]')
        .click()
        .should('have.class', 'active')
    })
    it('tests if there is two bookmarked items', () => {
      cy.get('[data-cy="Bookmark"]')
        .should('have.class', 'bookmark-active')
        .should('have.length', 2)
    })
    it('deletes bookmark from first item', () => {
      cy.get('[data-cy="Bookmark"]')
        .first()
        .click()
    })
    it('tests if there is one bookmarked item left', () => {
      cy.get('[data-cy="Bookmark"]')
        .should('have.class', 'bookmark-active')
        .should('have.length', 1)
    })
    it('goes back to main screen and shows all festivals', () => {
      cy.get('[data-cy="NavBarBottomIcon"]')
        .click()
        .not('have.class', 'active')
    })
  })

  describe('Search for festival', () => {
    it('has an input', () => {
      cy.get('[data-cy=InputSearch]').should('have.length', 1)
    })

    it('searches for typed in festival name', () => {
      cy.get('[data-cy=InputSearch]').type('MELT')
    })
    it('checks if the correct festival is shown', () => {
      cy.get('[data-cy=festEl]').should('have.length', 1)
      cy.get('[data-cy=festName]')
        .should('have.length', 1)
        .contains('Melt')
    })
    it('clears the input and shows the whole list again', () => {
      cy.get('[data-cy=InputSearch]').clear()
      cy.focused().clear()
    })
  })
})
