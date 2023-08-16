// cypress/integration/signUpDoctor.spec.js

describe('Doctor Registration', () => {
    it('fills and submits the registration form', () => {
      cy.visit('https://ndoc.ewarenet.com/auth/reg_doc'); // Adjust the route as needed
  
      cy.get('ion-label').contains('Name').siblings('input').type('John Doe');
      cy.get('ion-label').contains('Email').siblings('input').type('john@example.com');
      cy.get('ion-label').contains('Mobile Number').siblings('input').type('1234567890');
      cy.get('ion-label').contains('Password').siblings('input').type('secretpassword');
      cy.get('ion-label').contains('PMDC').siblings('input').type('123456');
  
      cy.get('ion-button[type="submit"]').click();
  
      // Add assertions to verify the behavior after form submission
    });
  });
  