/// <reference types="cypress"/>

import loc from "../../support/locators";

const base_url = "https://www.way2automation.com/angularjs-protractor/banking/"
const test_user_name = "Harry Potter";
const test_user_pass = "P@ssword";

it("Should log in the bank with user selected", () => {
    cy.visit(base_url+"#/login") // Visit home page
    cy.get(loc.CUSTOMER_LOGIN.BTN_OPEN_LOGIN).click() // Enter login page

    cy.url() // Confirm that we got to the login page
        .should("not.include", "/login")
        .should("include", "/customer");
    
    // Pick a user to log in
    cy.get(loc.CUSTOMER_LOGIN.DROPDOWN_PICK_USER).select(test_user_name)  
        //.should('have.value', test_user_name) // Nao da, volta '2', o indice...
    cy.get(loc.CUSTOMER_LOGIN.BTN_CONFIRM_LOGIN).click() //  Login with user picked

    cy.url() // Confirm that we got to the account page
        .should("not.include", "/login")
        .should("include", "/account");

    //Confirm we loged in the correct account
    cy.get(loc.CUSTOMER_ACCOUNT.WELCOME_MSG).should("contain", test_user_name)
})

describe("Testing at a funcional level", () => {
    
    beforeEach( () => {
        cy.Login(test_user_name, test_user_pass)
    })

    specify("That should allow positive depoist values", () => {
        cy.get(loc.CUSTOMER_ACCOUNT.MENU.DEPOSIT.BTN).click()
        cy.get(loc.CUSTOMER_ACCOUNT.MENU.DEPOSIT.VALUE_FORM).type(10)
        cy.get(loc.CUSTOMER_ACCOUNT.MENU.DEPOSIT.CONFIRM).click()
        cy.get(loc.CUSTOMER_ACCOUNT.MENU.DEPOSIT.SCOPE).contains("Deposit Successful").should("exist")
        cy.get(loc.CUSTOMER_ACCOUNT.BALLENCE).invoke("text").then(parseFloat).should("be.gte", 10)
    })

    specify("That should not allow negative deposit values", () => {
        cy.get(loc.CUSTOMER_ACCOUNT.MENU.DEPOSIT.BTN).click()
        cy.get(loc.CUSTOMER_ACCOUNT.MENU.DEPOSIT.VALUE_FORM).type('-1')
        cy.get(loc.CUSTOMER_ACCOUNT.MENU.DEPOSIT.CONFIRM).click()
        cy.get(loc.CUSTOMER_ACCOUNT.MENU.DEPOSIT.SCOPE).contains("Deposit Successful").should("not.exist")
    })

})