import 'cypress-wait-until';
describe('Login Page', () => {
  it('can click the "Sign Up" link', () => {
    cy.visit('http://localhost:8100/'); // Adjust the route as needed

    // Find the "Sign Up" link by its ID and click it
    
    
    // cy.get('#name').type('John Doe');
    // cy.get('#name', { timeout: 10000 }).should('be.visible').type('John Doe');
    // // cy.wait(3000); // Wait for 3 seconds or adjust as necessary
    // cy.waitUntil(() => {
    //   return cy.get("[data-cy=name]").isVisible();
    // });
    
    // cy.get("[data-cy=name]").type("John Doe");

// cy.get('#sign').click();
//     cy.get("#name").type("John Doe");
//     cy.get("#email").type("john.doe@example.com");
//     cy.get("#mobileNumber").type("1234567890");
//     cy.get("#password").type("password123");
//     cy.get("#pmdc").type("123456789");
//     cy.get('body').click();
//     cy.wait(3000);
//     cy.get("#signup").click();
//     cy.get("#names").type("hassan clinic");
//     cy.get("#address").type("b-17 Islamabad");
//     cy.get("#mobilenumbers").type("123456789");
//     cy.get('body').click();
//     cy.get("#submits").click();
//     cy.get("#test").click();
//     cy.get("#test1").click();
//     cy.get("#test2").type("12:00");
//     cy.get("#test3").type("12:45");


    // Click the Submit button
    // cy.get("#submitsch").click();
    // cy.get("[data-cy=name]").type("ABC Clinic");
    // cy.get("[data-cy=address]").type("123 Main Street");
    // cy.get("[data-cy=mobileNumber]").type("1234567890");
    // cy.get("[data-cy=submit]").click();
    // const name = 'My Clinic';
    // const address = '123 Main St, City';
    // const mobileNumber = '1234567890';

   
      // cy.visit('/'); // Adjust the route if needed
  
      // Loop through each day of the week and select a session
      // const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      // daysOfWeek.forEach(day => {
      //   cy.get("#name123").check();
      // });
  
      
  
      // Assert any success or error messages after form submission
      // cy.get('Toast[color="success"]').should('be.visible');
      cy.get("#mobilenumber").type("1234567890");
      cy.get("#pass").type("password123");
      cy.get('body').click();
      cy.get("#login").click();
      // cy.visit('http://localhost:8100/members/alert/vaccine-alert');
      // cy.wait(3000);
      // cy.get("#alert").click();
      // cy.wait(3000);
      // cy.visit('http://localhost:8100/members/doctor/edit-profile');
      // cy.wait(3000);
      // cy.get("#name1").type('{selectall}{backspace}');
      // cy.get("#email").type('{selectall}{backspace}');
      // cy.get("#mob").type('{selectall}{backspace}');
      // cy.get("#pmdc").type('{selectall}{backspace}');
      // cy.get("#name").type('atta');
      // cy.get("#email").type('atta@gmail.com');
      // cy.get("#mob").type('03331234567');
      // cy.get("#pmdc").type('A-1234');
      // cy.get("[type=submit]").click();

      
  //     cy.visit('http://localhost:8100/members/child/add');
  //     cy.get('#name').type("hassan");
  //     cy.get('#fname').type("fhassan");
  //     cy.get('#email').type("hassan@gmail.com");
  //     cy.get('#cnic').type("62202-1234567-1");
  //     cy.get('#mno').type("03145530889");
  //     cy.get('#db').type('1990-01-01');
    
  //     // Select radio button
  //     cy.get('[value="boy"]').click();
  
  //     // Select dropdown options
  //     cy.get('#doc').click();

  //     // Select the desired doctor
  //     cy.wait(6000); // You can adjust the delay time as needed

  //     // Select the desired doctor
  //     // cy.contains('ahmed999', { timeout: 5000 }).should('be.visible');
  //     cy.get('#clinic').click();
  //     cy.wait(6000);
  //     cy.get('#city').click();
  //     cy.wait(6000);
  // // Increase timeout as needed
  // cy.get('#epi').click();
  // cy.get('#verified').click();
  // cy.get('#submit').click();
  // cy.wait(20000);//this is due to seen the patient is add or not


  
      // Verify that the selected date appears in the input field
      // cy.get('#db').should('have.value', targetDate);
      cy.visit('http://localhost:8100/members/doctor/schedule')
      cy.wait(20000);
    // cy.get('IonInput[placeholder="Name"]').should('exist').type(name, { force: true });
    // cy.get('IonInput[placeholder="Address"]').should('exist').type(address, { force: true });
    // cy.get('IonInput[placeholder="Mobile Number"]').should('exist').type(mobileNumber, { force: true });
    // cy.get('IonButton[type="submit"]').should('exist').click();

    // cy.get("#submit").click();
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

