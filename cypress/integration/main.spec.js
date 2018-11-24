describe('Timetable-PLanner ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.clearLocalStorage()
  })

  describe('Render all festivals', () => {
    it('shows all festivals', () => {
      cy.get('[data-cy="FestList"]').should('have.length', 1)
    })
  })

  describe('Bookmark festival', () => {
    it('boomarks a festival', () => {
      cy.get('[data-cy="NavBarBottomIcon"]').click()
    })
  })

  describe('Toggle BookmarkedIcon List and Star', () => {
    it('toggles list', () => {
      cy.get('[data-cy="NavBarBottomIcon"]').click()
    })
  })

  //   it('has the right title', () => {
  //     cy.title().should('eq', 'Timetable-Planner')
  //   })
})
