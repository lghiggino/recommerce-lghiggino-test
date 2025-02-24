/// <reference types="cypress" />

describe('CustomNavbar Component', () => {
  beforeEach(() => {
    cy.visit('/');
    // We assume the CustomNavbar is present on the home page
    // If it's on a specific page, change the URL accordingly
  });

  it('should display the brand logo and name correctly', () => {
    // Test the logo and brand name are present
    cy.get('[class*="triangleLogo"]').should('be.visible');
    cy.get('[class*="brandSection"]').should('be.visible');
    cy.get('[class*="brandText"]').first().should('contain', 'RE');
    cy.get('[class*="brandText"]').last().should('contain', 'COMMERCE');
  });

  it('should display navigation links correctly in desktop view', () => {
    // Test desktop navigation
    cy.viewport(1024, 768); // Desktop viewport
    
    // Verify the nav links
    cy.get('[class*="navLinks"]').should('be.visible');
    cy.get('[class*="navItem"]').should('have.length.at.least', 4);
    
    // Check specific links
    cy.get('[class*="navLink"]').contains('HOME').should('be.visible');
    cy.get('[class*="navLink"]').contains('OUR PURPOSE').should('be.visible');
    cy.get('[class*="navLink"]').contains('OUR SUPPLIERS').should('be.visible');
    cy.get('[class*="navLink"]').contains('MEDIA').should('be.visible');
    
    // Verify desktop cart is visible
    cy.get('[class*="desktopCartItem"]').should('be.visible');
    cy.get('[class*="cartBadge"]').should('contain', '2'); // From initial state
  });

  it('should display and toggle mobile menu correctly', () => {
    // Test mobile menu toggle
    cy.viewport(375, 667); // Mobile viewport
    
    // Menu should be closed initially and nav hidden
    cy.get('[class*="navigation"]').should('not.have.class', 'mobileMenuOpen');
    
    // Mobile controls should be visible
    cy.get('[class*="mobileControls"]').should('be.visible');
    cy.get('[class*="menuButton"]').should('be.visible');
    
    // Click menu button to open menu
    cy.get('[class*="menuButton"]').click();
    
    // Menu should be open
    cy.get('[class*="navigation"]').should('have.class', 'mobileMenuOpen');
    
    // Mobile cart badge should show correct count
    cy.get('[class*="mobileControls"] [class*="cartBadge"]').should('contain', '2');
    
    // Verify overlay appears when menu is open
    cy.get('[class*="overlay"]').should('be.visible');
    
    // Click overlay to close menu
    cy.get('[class*="overlay"]').click();
    
    // Menu should be closed
    cy.get('[class*="navigation"]').should('not.have.class', 'mobileMenuOpen');
  });

  it('should navigate when links are clicked', () => {
    // Set up navigation spy
    cy.window().then((win) => {
      cy.spy(win, 'open').as('windowOpen');
    });
    
    // Click on a navigation link
    cy.get('[class*="navLink"]').contains('OUR PURPOSE').click();
    
    // Should navigate to the correct path
    cy.url().should('include', '/purpose');
  });

  it('should close mobile menu when a link is clicked', () => {
    // Test on mobile viewport
    cy.viewport(375, 667);
    
    // Open the mobile menu
    cy.get('[class*="menuButton"]').click();
    cy.get('[class*="navigation"]').should('have.class', 'mobileMenuOpen');
    
    // Click a navigation link
    cy.get('[class*="navLink"]').contains('OUR PURPOSE').click();
    
    // Menu should close
    cy.get('[class*="navigation"]').should('not.have.class', 'mobileMenuOpen');
  });

  // Removed accessibility test as it requires additional setup
});