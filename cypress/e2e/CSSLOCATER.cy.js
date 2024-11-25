describe("CSS Locator Test", () => {
    it("csslocater", () => {
        // Visit the website
        cy.visit("http://www.automationpractice.pl/index.php");
        
        // Type "T-shirt" in the search box
        cy.get("#search_query_top").type("T-shirt");
        
        // Click the search button
        cy.get("[name='submit_search']").click();
        
        // Verify the result contains "T-shirts"
        cy.get(".lighter").contains("T-shirts"); // Assertion
    });
});
