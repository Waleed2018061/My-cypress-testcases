describe('My First Test', () => 
    {
    it('verify title-positive', () => 
        {
      cy.visit("https://www.orangehrm.com/")
      cy.title().should('eq','OrangeHRM')
    })

    it('verify title-nagative', () => {

    
    cy.visit("https://www.orangehrm.com/")
      cy.title().should('eq','OrangeHRM123')

    
  })
}) 