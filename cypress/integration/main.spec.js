describe('Timetable-PLanner ', () => {
  before(() => {
    cy.visit('http://localhost:3000')
    cy.clearLocalStorage()
  })
  it('successfully loads', function() {
    cy.visit('http://localhost:3000')
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

  describe('Main section shows list with all festivals and is scrollable', () => {
    it('shows all festivals', () => {
      cy.get('[data-cy=FestList]')
        .should('have.length', 1)
        .get('[data-cy=festEl]')
        .should('have.length', 28)

    })
    it('is scrolablle', () => {
      cy.get('[data-cy=FestList]')
        .scrollTo(0, 500)
        .scrollTo(500, 0)
    })
  })


  describe('Bookmark festivals', () => {
    it('boomarks first festival', () => {
      cy.get('[data-cy=Bookmark]')
        .first()
        .click()
    })
    it('boomarks third festival', () => {
      cy.get('[data-cy=Bookmark]')
        .eq(2)
        .click()
    })
    it('switches to bookmarked list', () => {
      cy.get('[data-cy=showBookmarkedFestList]')
        .click()
        .should('have.class', 'active')
    })
    it('tests if there is two bookmarked items', () => {
      cy.get('[data-cy=Bookmark]')
        .should('have.class', 'bookmark-active')
        .should('have.length', 2)
    })
    it('deletes bookmark from first item', () => {
      cy.get('[data-cy=Bookmark]')
        .first()
        .click()
    })
    it('tests if there is one bookmarked item left', () => {
      cy.get('[data-cy=Bookmark]')
        .should('have.class', 'bookmark-active')
        .should('have.length', 1)
    })
    it('goes back to main screen and shows all festivals', () => {
      cy.get('[data-cy=showBookmarkedFestList]')
        .click({ multiple: true })
        .not('have.class', 'active')
    })
    it('checks if the sort by date icon is active', () => {
      cy.get('[data-cy=sortFestsDate]')
      .should('have.attr', 'width', '75')
      .should('have.class', 'active')
    })

    it('clicks on the sort alphabetically icon', () => {
      cy.get('[data-cy=sortFestsAlpha]')
      .click()
      .should('have.class', 'active')
    })

    it('chechs if the sort filter works', () => {
      cy.get('[data-cy=festDateTimeLine]')
      .first()
      .should('have.attr', 'datetime')
    })
  })


  describe('Search for festival', () => {
    const inputText = 'Docklands Festival'
    it('checks if page has an input', () => {
      cy.get('[data-cy=InputSearch]').should('have.length', 1)
    })

    it('searches for typed in festival name', () => {
      cy.get('[data-cy=InputSearch]')
      .type(inputText)
      .should('have.value', inputText)
    })
    it('checks if the correct festival is shown', () => {
      cy.get('[data-cy=festEl]').should('have.length', 1)
      cy.get('[data-cy=festName]')
        .should('have.length', 1)
        .contains(inputText)
    })
    it('clears the input and shows the whole list again', () => {
      cy.get('[data-cy=InputSearch]').clear()
      cy.focused().clear()
    })
  })
  

  describe('Visit festival page and show timetable', () => {
    it('clicks on 9th festival and changes the path', () => {
      cy.get('[data-cy=festElLink]')
        .eq(8)
        .click()
    })
    it('checks the path', () => {
      cy.url().should('contain', '/timetable')
    })

    it('checks if content is scrolling', () => {
      cy.get('[data-cy=ActsList]')
        .scrollTo('bottom')
        .scrollTo('top')
        .scrollTo('left')
        .scrollTo('right')
    })
  })
  describe('Site has the correct headline', () => {
    it('has the right headline', () => {
      cy.get('h1')
        .contains('Docklands Festival')
        .should('have.length', 1)
    })
  })
 

 describe('checks stage filter and days filter', () => {
  it('shows the stage filter container', () => {
    cy.get('[data-cy=filterStages]')
    .should('have.length', 1) 
  })
  it('shows the days filter container', () => {
    cy.get('[data-cy=filterDays]')
    .should('have.length', 1) 
  })
  it('scrolls the stage filter container', () => {
    cy.get('[data-cy=filterStages]')
    .scrollTo('left')
    .scrollTo('right') 
  })
  it('checks if all filter were rendert into the container', () => {
    cy.get('[data-cy=filterEl]')
    .should('have.length', 21) 
  })
  it('clicks 5th stage filter', () => {
    cy.get('[data-cy=filterEl]')
    .eq(2)
    .click()
    .should('contain', 'Smirnoff Openair') 
    .should('have.class', 'filter-active')
  })
  it('clicks second stage filter', () => {
    cy.get('[data-cy=filterEl]')
    .eq(1)
    .click()
    .should('contain', 'FlOpenair') 
    .should('have.class', 'filter-active')
  })
  it('clicks 18th stage filter', () => {
    cy.get('[data-cy=filterEl]')
    .eq(17)
    .click()
    .should('contain', 'Dschungelbuch') 
    .should('have.class', 'filter-active')
  })
  it('checks if the correct number of stages was rendered', () => {
    cy.get('[data-cy=innerColumn]')
    .should('have.length', 3)
  })
  it('clicks the all stages filter', () => {
    cy.get('[data-cy=filterEl]')
    .eq(0)
    .click()
    .should('have.class', 'filter-active')
  })
  it('clicks 18th stage filter', () => {
    cy.get('[data-cy=filterEl]')
    .eq(19)
    .should('contain', 'All Days') 
    .should('have.class', 'filter-active')
  })
})


  describe('Bookmark Acts', () => {
    it('boomarks first act', () => {
      cy.get('[data-cy=Bookmark]')
        .first()
        .click()
    })

    it('boomarks another act', () => {
      cy.get('[data-cy=Bookmark]')
        .eq(1)
        .click()
    })

    it('boomarks another act', () => {
      cy.get('[data-cy=actEl]')
      .contains('Cutmaster Jay')
      .should('have.length', 1)
      .get('[data-cy=Bookmark]')
      .eq(8)
      .click()
    })

    it('switches to bookmarked list', () => {
      cy.get('[data-cy=showBookmarkedActsList]')
        .click({ multiple: true })
        .should('have.class', 'active')
    })

    it('tests if there is 4 bookmarked items', () => {
      cy.get('[data-cy=Bookmark]')
        .should('have.class', 'bookmark-active')
        .should('have.length', 4)
    })

    it('tests if time is overlapping icon is active', () => {
      cy.get('[data-cy=Warning]')
        .should('have.class', 'warning-active')
        .should('have.length', 4)
    })

    it('switches to complete list', () => {
      cy.get('[data-cy=showBookmarkedActsList]')
        .click({ multiple: true })
        .not('have.class', 'active')
    })
  })

  
    describe('Sorting criteria nav bar bottom act site', () => {
      it('clicks on the sort alphabeticaly button', () => {
        cy.get('[data-cy=sortActsAlpha]').click()
      })

      it('clicks on the sort by stage button', () => {
        cy.get('[data-cy=sortActsByStageIcon]')
        .click()
        .should('have.class', 'active')
      })

      it('clicks on the sort by time button', () => {
        cy.get('[data-cy=sortActsByTime]')
        .click()
        .should('have.class', 'active')
      })
    })


      describe('Search for act', () => {
        const inputText = 'Monika Kruse'
        it('checks if page has an input', () => {
          cy.get('[data-cy=InputSearch]').should('have.length', 1)
        })
    
        it('searches for typed in act name', () => {
          cy.get('[data-cy=InputSearch]')
          .type(inputText)
          .should('have.value', inputText)
        })
        it('checks if the correct act is shown', () => {
          cy.get('[data-cy=actEl]').should('have.length', 2)
          cy.get('[data-cy=actName]')
            .should('have.length', 2)
            .contains(inputText)
        })
        it('clears the input and shows the whole list again', () => {
          cy.get('[data-cy=InputSearch]').clear()
          cy.focused().clear()
        })
      })


  describe('Navigating back to homescreen', () => {
      it('gets back to festival page', () => {
        cy.get('[data-cy=backToHomepage]').click()
      })
    })
  
})
