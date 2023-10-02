import 'cypress-wait-until';
describe('Login Page', () => {
  it('can click the "Sign Up" link', () => {
    cy.visit('http://localhost:8100/'); // Adjust the route as needed


cy.get('#sign').click();
    cy.get("#name").type("John Doe");
    cy.get("#email").type("john.doe@example.com");
    cy.get("#mobileNumber").type("1234567890");
    cy.get("#password").type("password123");
    cy.get("#pmdc").type("123456789");
    cy.get('body').click();
    cy.wait(3000);
    cy.get("#signup").click();
    cy.get("#names").type("hassan clinic");
    cy.get("#address").type("b-17 Islamabad");
    cy.get("#mobilenumbers").type("123456789");
    cy.get("#fee").type("123");
    cy.get('body').click();

    cy.get("#submits").click();
    cy.get("#test").click();
    cy.get("#test1").click();
    cy.get("#test2").type("12:00");
    cy.get("#test3").type("12:45");
    cy.get("#submitsch").click();
    cy.wait(6000);


 
      
  
      // Assert any success or error messages after form submission
      // cy.get('Toast[color="success"]').should('be.visible');
    //   #for login
      cy.get("#mobilenumber").type("1234567890");
      cy.get("#pass").type("password123");
      cy.get('body').click();
      cy.get("#login").click();
      cy.wait(3000)

// #for alert
      cy.visit('http://localhost:8100/members/alert/vaccine-alert');
      cy.wait(3000);
      cy.get("#alert").click();
      cy.wait(3000);
      

    //   #for edit doctor
      cy.visit('http://localhost:8100/members/doctor/edit-profile');
      cy.wait(3000);
      cy.get("#name1").type('{selectall}{backspace}');
      cy.get("#email").type('{selectall}{backspace}');
      cy.get("#mob").type('{selectall}{backspace}');
      cy.get("#pmdc").type('{selectall}{backspace}');
      cy.get("#name1").type('atta');
      cy.get("#email").type('atta@gmail.com');
      cy.get("#mob").type('03331234567');
      cy.get("#pmdc").type('A-1234');
      cy.get("[type=submit]").click();

      
    //   for add child
      cy.visit('http://localhost:8100/members/child/add');
      cy.get('#name').type("hassan");
      cy.get('#fname').type("fhassan");
      cy.get('#email').type("hassan@gmail.com");
      cy.get('#cnic').type("62202-1234567-1");
      cy.get('#mno').type("03145530889");
      cy.get('#db').type('1990-01-01');
      cy.get('#pass').type('123');        
      cy.get('[value="boy"]').click();
      cy.get('#doc').click();
      cy.wait(6000); 
      cy.get('#clinic').click();
      cy.wait(6000);
      cy.get('#city').click();
      cy.wait(6000);
  cy.get('#epi').click();
  cy.get('#verified').click();
  cy.get('#submit').click();
  cy.wait(20000);


// for open the patient list 
// cy.visit('http://localhost:8100/members/child');
cy.get('#male').click();
cy.wait(2000);


// for single date update
cy.get('#single').should('be.visible').click();
 // Assert that the button's text is "3".
 cy.contains('3');
 cy.wait(3000);
    


//for bulk date
 cy.get('#bulk').click();
//   Assert that the button's text is "3".
  cy.wait(5000);
  cy.contains('3');



    //   for bulk skip
// cy.get('#skip').click();
// for bulk done
cy.get('#done').click();
cy.wait(5000);
cy.get('#brand').click();
cy.wait(30000);
cy.pause();
cy.get('#date1').type('2023-08-01');
cy.get('#submit').click();


// for single done and skip
cy.get('#skip1').click();
cy.get('#done1').click();
cy.wait(5000);
cy.get('#brand1').click();
cy.wait(3000);
cy.get('#date12').type('2023-08-01');
cy.get('#submit').click();

//for doctor single and bulk update
      cy.visit('http://localhost:8100/members/doctor/schedule')
      cy.wait(5000);
    cy.get('#single').should('be.visible').click();

    cy.contains('3');
    
 

    cy.wait(5000);
    cy.get('#bulk').click();


    cy.contains('3');
    // cy.get('body').click();
    

  });
  // it('can fill in the clinic registration form', () => {
  //   // const name = 'My Clinic';
  //   // const address = '123 Main St, City';
  //   // const mobileNumber = '1234567890';

 

  //   cy.get("#names").type("hassan clinic");
  //   cy.get("#address").type("b-17 Islamabad");
  //   cy.get("#mobilenumbers").type("123456789");

  //   cy.get("#submits").click();

  //   // Add assertions to verify the behavior after form submission, such as navigation or success messages.
  // });
});
// describe('Doctor Registration', () => {
//   it('fills and submits the registration form', () => {
   
//     cy.get('#name').type('John Doe');
//     cy.get('#email').type('john@example.com');
//     cy.get('#mobileNumber').type('1234567890');
//     cy.get('#password').type('secretpassword');
//     cy.get('#pmdc').type('123456');

//     // Submit the form
//     cy.get('#signup').click();

//     // Add assertions to verify the behavior after form submission
//   });
// });

