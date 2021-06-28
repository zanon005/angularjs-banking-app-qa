// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import loc from "./locators";

Cypress.Commands.add('Login', (user, password) => {
    const base_url = "https://www.way2automation.com/angularjs-protractor/banking/"
    cy.visit(base_url+"#/login") // Visit home page
    cy.get(loc.CUSTOMER_LOGIN.BTN_OPEN_LOGIN).click()

    cy.get(loc.CUSTOMER_LOGIN.DROPDOWN_PICK_USER).select(user)
    cy.get(loc.CUSTOMER_LOGIN.BTN_CONFIRM_LOGIN).click()
})