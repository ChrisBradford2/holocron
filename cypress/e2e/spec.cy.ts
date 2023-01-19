describe('Main spec', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
  })
  it('Visits people page', () => {
    cy.visit('localhost:3000/people')
    cy.get('h1').should('contain', 'People')
    cy.wait(1000)
    cy.get('li').should('have.length', 10)
    // Check that the first li has the link and the image
    cy.get('li').first().find('a').should('have.attr', 'href')
    cy.get('li').first().find('img').should('have.attr', 'src')
    // Click on the first link
    cy.get('li').first().find('a').click()
    // Check that the page has the name of the person
    cy.get('h1').should('contain', 'Luke Skywalker')
    // Check that the page has the birth year
    cy.get('p').should('contain', '19BBY')
    // Get back to the people page
    cy.get('a').contains('Back to the people list').click()
    // Get back to the main page
    cy.get('a').contains('Back to home').click()
  })
  it('Visits planets page', () => {
    cy.visit('localhost:3000/planets')
    cy.get('h1').should('contain', 'Planets')
    cy.wait(1000)
    cy.get('li').should('have.length', 10)
    // Check that the first li has the link and the image
    cy.get('li').first().find('a').should('have.attr', 'href')
    cy.get('li').first().find('img').should('have.attr', 'src')
    // Click on the first link
    cy.get('li').first().find('a').click()
    // Check that the page has the name of the planet
    cy.get('h1').should('contain', 'Tatooine')
    // Check that the page has the population
    cy.get('p').should('contain', '200000')
    // Get back to the planets page
    cy.get('a').contains('Back to the planets list').click()
    // Get back to the main page
    cy.get('a').contains('Back to home').click()
  })
  it('Visits starships page', () => {
    cy.visit('localhost:3000/starships')
    cy.get('h1').should('contain', 'Starships')
    cy.wait(1000)
    cy.get('li').should('have.length', 10)
    // Check that the first li has the link and the image
    cy.get('li').first().find('a').should('have.attr', 'href')
    cy.get('li').first().find('img').should('have.attr', 'src')
    // Click on the first link
    cy.get('li').first().find('a').click()
    // Check that the page has the name of the starship
    cy.get('h1').should('contain', 'CR90 corvette')
    // Check that the page has the model
    cy.get('p').should('contain', 'CR90 corvette')
    // Get back to the starships page
    cy.get('a').contains('Back to the starships list').click()
    // Get back to the main page
    cy.get('a').contains('Back to home').click()
  })
  it('Visits vehicles page', () => {
    cy.visit('localhost:3000/vehicles')
    cy.get('h1').should('contain', 'Vehicles')
    cy.wait(1000)
    cy.get('li').should('have.length', 10)
    // Check that the first li has the link and the image
    cy.get('li').first().find('a').should('have.attr', 'href')
    cy.get('li').first().find('img').should('have.attr', 'src')
    // Click on the first link
    cy.get('li').first().find('a').click()
    // Check that the page has the name of the vehicle
    cy.get('h1').should('contain', 'Sand Crawler')
    // Check that the page has the model
    cy.get('p').should('contain', 'Digger Crawler')
    // Get back to the vehicles page
    cy.get('a').contains('Back to the vehicles list').click()
    // Get back to the main page
    cy.get('a').contains('Back to home').click()
  })
  it('Visits species page', () => {
    cy.visit('localhost:3000/species')
    cy.get('h1').should('contain', 'Species')
    cy.wait(1000)
    cy.get('li').should('have.length', 10)
    // Check that the first li has the link and the image
    cy.get('li').first().find('a').should('have.attr', 'href')
    cy.get('li').first().find('img').should('have.attr', 'src')
    // Click on the first link
    cy.get('li').first().find('a').click()
    // Check that the page has the name of the species
    cy.get('h1').should('contain', 'Human')
    // Check that the page has the classification
    cy.get('p').should('contain', 'mammal')
    // Get back to the species page
    cy.get('a').contains('Back to the species list').click()
    // Get back to the main page
    cy.get('a').contains('Back to home').click()
  })
  it('Visits films page', () => {
    cy.visit('localhost:3000/films')
    cy.get('h1').should('contain', 'Films')
    // Wait for the API to respond
    cy.wait(5000)
    cy.get('li').should('have.length', 6)
    // Check that the first li has the link and the image
    cy.get('li').first().find('a').should('have.attr', 'href')
    cy.get('li').first().find('img').should('have.attr', 'src')
    // Click on the first link
    cy.get('li').first().find('a').click()
    // Check that the page has the title of the film
    cy.get('h1').should('contain', 'A New Hope')
    // Check that the page has the director
    cy.get('p').should('contain', 'George Lucas')
    // Get back to the films page
    cy.get('a').contains('Back to the films list').click()
    // Get back to the main page
    cy.get('a').contains('Back to home').click()
  })
})