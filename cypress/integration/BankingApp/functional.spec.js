/// <reference types="cypress"/>

import loc from "../../support/locators";

const base_url = "https://www.way2automation.com/angularjs-protractor/banking/"
const test_user_name = "Harry Potter";
const test_user_pass = "P@ssword";

it("Should log in the bank with customer selected", () => {
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


describe("Testing accounts with ballance above zero" ,() => {
    beforeEach( () => {
        console.log("BeforeEach... do Login!")
        // Why the need for {(cutomers)} ??
        cy.fixture("users/customers_with_balance").then( ({customers}) => {
            const rand_id = Cypress._.random(0, customers.length-1)
            console.log("Customer Chosen: "+rand_id)
            const customer = customers[rand_id]
            cy.Login(customer.name)
        })
        cy.get(loc.CUSTOMER_ACCOUNT.BALLENCE).invoke('text').then( (balance) => {
            console.log("BEFORE_EACH - Initial Balance: "+balance)
            cy.wrap(balance).then(parseFloat).as("initial_balance")
        })
    })

    specify("That should be able to withdrawl if balance is not zero", () => {
        cy.get('@initial_balance').then( (initial_balance) => {
            if(initial_balance != 0){
                const withdrawl_ammount = Cypress._.random(0, initial_balance)
                cy.get(loc.CUSTOMER_ACCOUNT.MENU.WITHDRAWL.BTN).click()
                cy.get(loc.CUSTOMER_ACCOUNT.MENU.WITHDRAWL.VALUE_FORM).type(withdrawl_ammount)
                cy.get(loc.CUSTOMER_ACCOUNT.MENU.WITHDRAWL.CONFIRM).click()
                cy.get(loc.CUSTOMER_ACCOUNT.MENU.WITHDRAWL.SCOPE).should("contain.text", "Transaction successful")
            }
        })
    })
})


describe("Testing accounts with zero ballance", () => {
    
    beforeEach( () => {
        console.log("BeforeEach... do Login!")
        // Why the need for {(cutomers)} ??
        cy.fixture("users/customers").then( ({customers}) => {
            const rand_id = Cypress._.random(0, customers.length-1)
            console.log("Customer Chosen: "+rand_id)
            const customer = customers[rand_id]
            cy.Login(customer.name)
        })
        cy.get(loc.CUSTOMER_ACCOUNT.BALLENCE).invoke('text').then( (balance) => {
            console.log("BEFORE_EACH - Initial Balance: "+balance)
            cy.wrap(balance).then(parseFloat).as("initial_balance")
        })
    })

    specify("That should allow positive depoist values", () => {
        const deposit_value = 10        
        cy.get(loc.CUSTOMER_ACCOUNT.MENU.DEPOSIT.BTN).click()
        cy.get(loc.CUSTOMER_ACCOUNT.MENU.DEPOSIT.VALUE_FORM).type(deposit_value)
        cy.get(loc.CUSTOMER_ACCOUNT.MENU.DEPOSIT.CONFIRM).click()
        cy.get(loc.CUSTOMER_ACCOUNT.MENU.DEPOSIT.SCOPE).should("contain.text", "Deposit Successful")

        cy.get('@initial_balance').then( (initial_balance) => {
            console.log("Test - Initial Balance: "+initial_balance)
            cy.get(loc.CUSTOMER_ACCOUNT.BALLENCE).invoke('text').then( (balance) => {
                cy.wrap(balance).then(parseFloat).should("be.equal", initial_balance + deposit_value)
            })
        })
    })

    specify("That should not allow negative deposit values", () => {
        const deposit_value = -1
        cy.get(loc.CUSTOMER_ACCOUNT.MENU.DEPOSIT.BTN).click()
        cy.get(loc.CUSTOMER_ACCOUNT.MENU.DEPOSIT.VALUE_FORM).type(deposit_value)
        cy.get(loc.CUSTOMER_ACCOUNT.MENU.DEPOSIT.CONFIRM).click()
        cy.get(loc.CUSTOMER_ACCOUNT.MENU.DEPOSIT.SCOPE).should("not.contain", "Deposit Successful")
        
        cy.get('@initial_balance').then( (initial_balance) => {
            console.log("Test - Initial Balance: "+initial_balance)
            cy.get(loc.CUSTOMER_ACCOUNT.BALLENCE).invoke('text').then( (balance) => {
                cy.wrap(balance).then(parseFloat).should("be.equal", initial_balance)
            })
        })
    })

    specify("That should be not able to withdrawl above balance", () => {
        cy.get('@initial_balance').then( (initial_balance) => {
            const withdrawl_ammount = initial_balance + 1
            cy.get(loc.CUSTOMER_ACCOUNT.MENU.WITHDRAWL.BTN).click()
            cy.get(loc.CUSTOMER_ACCOUNT.MENU.WITHDRAWL.VALUE_FORM).type(withdrawl_ammount)
            cy.get(loc.CUSTOMER_ACCOUNT.MENU.WITHDRAWL.CONFIRM).click()
            cy.get(loc.CUSTOMER_ACCOUNT.MENU.WITHDRAWL.SCOPE).should("contain.text", "Transaction Failed")
        })
    })


})