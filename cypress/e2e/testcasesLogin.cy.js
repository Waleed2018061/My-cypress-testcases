describe('Login Page Automation', () => {
    beforeEach(() => {
      cy.visit('https://your-login-page-url.com'); // Replace with your actual login page URL
    });
  
    it('TC001 - Verify valid username input', () => {
      cy.get('input[name="username"]').type('validuser'); // Replace with the username field selector
      cy.get('input[name="username"]').should('have.value', 'validuser');
    });
  
    it('TC002 - Verify valid password input', () => {
      cy.get('input[name="password"]').type('ValidPass@123'); // Replace with the password field selector
      cy.get('input[name="password"]').should('have.value', 'ValidPass@123');
    });
  
    it('TC003 - Verify login fails with empty username', () => {
      cy.get('input[name="password"]').type('ValidPass@123'); // Fill the password field
      cy.get('button').contains('LOGIN').click(); // Click the login button
      cy.get('.error-message') // Replace with the actual error message selector
        .should('be.visible')
        .and('contain', 'Username is required'); // Expected error message
    });
  
    it('TC004 - Verify login fails with empty password', () => {
      cy.get('input[name="username"]').type('validuser'); // Fill the username field
      cy.get('button').contains('LOGIN').click(); // Click the login button
      cy.get('.error-message') // Replace with the actual error message selector
        .should('be.visible')
        .and('contain', 'Password is required'); // Expected error message
    });
  
    it('TC005 - Verify login fails with invalid username or password', () => {
      cy.get('input[name="username"]').type('invaliduser'); // Invalid username
      cy.get('input[name="password"]').type('InvalidPass123'); // Invalid password
      cy.get('button').contains('LOGIN').click();
      cy.get('.error-message') // Replace with the actual error message selector
        .should('be.visible')
        .and('contain', 'Invalid username or password'); // Expected error message
    });
  
    it('TC006 - Verify successful login', () => {
      cy.get('input[name="username"]').type('validuser'); // Valid username
      cy.get('input[name="password"]').type('ValidPass@123'); // Valid password
      cy.get('button').contains('LOGIN').click();
      cy.url().should('include', '/dashboard'); // Replace with the expected redirect URL
    });
  
    it('TC007 - Verify username field does not accept special characters', () => {
      cy.get('input[name="username"]').type('invalid@user!'); // Special characters
      cy.get('button').contains('LOGIN').click();
      cy.get('.error-message') // Replace with the actual error message selector
        .should('be.visible')
        .and('contain', 'Special characters are not allowed'); // Expected error message
    });
  
    it('TC008 - Verify password length validation', () => {
      cy.get('input[name="username"]').type('validuser');
      cy.get('input[name="password"]').type('pass'); // Less than 8 characters
      cy.get('button').contains('LOGIN').click();
      cy.get('.error-message') // Replace with the actual error message selector
        .should('be.visible')
        .and('contain', 'Password must be at least 8 characters'); // Expected error message
    });
  
    it('TC009 - Verify placeholder text for username and password fields', () => {
      cy.get('input[name="username"]')
        .should('have.attr', 'placeholder', 'Enter your username'); // Replace with actual placeholder
      cy.get('input[name="password"]')
        .should('have.attr', 'placeholder', 'Enter your password'); // Replace with actual placeholder
    });
  
    it('TC010 - Verify password field masks input', () => {
      cy.get('input[name="password"]').type('Password123');
      cy.get('input[name="password"]').should('have.attr', 'type', 'password'); // Verify password masking
    });
  
    it('TC011 - Verify login button is disabled when fields are empty', () => {
      cy.get('button').contains('LOGIN').should('be.disabled'); // Verify button is disabled
    });
  
    it('TC012 - Verify error message display is clear and visible', () => {
      cy.get('button').contains('LOGIN').click(); // Trigger error by clicking without inputs
      cy.get('.error-message') // Replace with the actual error message selector
        .should('be.visible')
        .and('have.css', 'color', 'rgb(255, 0, 0)'); // Verify red color for error message
    });
     it('TC013 - Validate "Forgot Password" and "Sign Up" links', () => {
      // Verify "Forgot Password" link is visible and clickable
      cy.get('a').contains('Forgot password').should('be.visible').click();
      cy.url().should('include', '/forgot-password'); // Replace with actual URL of the Forgot Password page
  
      // Go back to login page
      cy.go('back');
  
      // Verify "Sign Up" link is visible and clickable
      cy.get('a').contains('Sign Up').should('be.visible').click();
      cy.url().should('include', '/signup'); // Replace with actual URL of the Sign-Up page
    });
   it('TC0014 - Verify successful login redirects to third-party page', () => {
      // Enter valid username and password
      cy.get('input[name="username"]').type('validuser');
      cy.get('input[name="password"]').type('ValidPass@123');
  
      // Click Login Button
      cy.get('button').contains('LOGIN').click();
  
      // Validate Redirection to Third-Party Page
      cy.url().should('include', 'www.xyz.com'); // Third-party page
    });
  
    it('TC015 - Handle third-party redirection and verify final destination', () => {
      // Enter valid username and password
      cy.get('input[name="username"]').type('validuser');
      cy.get('input[name="password"]').type('ValidPass@123');
  
      // Click Login Button
      cy.get('button').contains('LOGIN').click();
  
      // Wait for redirection to third-party page
      cy.url().should('include', 'www.xyz.com');
  
      // Simulate redirection to final destination page
      cy.wait(5000); // Adjust based on how long redirection takes
      cy.visit('https://final-destination-url.com'); // Replace with final destination page URL
  
      // Validate Final Destination Page
      cy.url().should('include', '/dashboard'); // Validate the final page URL
      cy.get('.welcome-message') // Replace with actual selector
        .should('be.visible')
        .and('contain', 'Welcome back!');
    });
  
    it('TC016 - Validate error message for invalid login', () => {
      // Enter invalid username and password
      cy.get('input[name="username"]').type('invaliduser');
      cy.get('input[name="password"]').type('InvalidPass@123');
  
      // Click Login Button
      cy.get('button').contains('LOGIN').click();
  
      // Validate Error Message
      cy.get('.error-message') // Replace with actual error message selector
        .should('be.visible')
        .and('contain', 'Invalid username or password');
    });
  
    it('TC017 - Verify redirection tokens and session cookies (optional)', () => {
      // Enter valid credentials
      cy.get('input[name="username"]').type('validuser');
      cy.get('input[name="password"]').type('ValidPass@123');
  
      // Click Login Button
      cy.get('button').contains('LOGIN').click();
  
      // Validate third-party page
      cy.url().should('include', 'www.xyz.com');
  
      // Check if session token or cookie is set
      cy.getCookie('session_token') // Replace 'session_token' with actual cookie name
        .should('exist')
        .then((cookie) => {
          expect(cookie.value).to.not.be.empty; // Validate cookie has a value
        });
  
      // Visit final destination page
      cy.visit('https://final-destination-url.com');
      cy.url().should('include', '/dashboard');
    });
  });