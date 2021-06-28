/// <reference types="cypress"/>

const base_url = "https://www.way2automation.com/angularjs-protractor/banking/"
describe("Cypress basics", () => {
    it.skip("Should visit a page and assert title", () => {
        cy.visit(base_url+"#/login")

        cy.title()
            .should("not.be.null")
            .should("contain", "Banking")
            .should("contain", "App")
        
    })

    it.skip("Should find and iteract with button 'Customer Login'", () => {
        cy.visit(base_url+"#/login")

        cy.get('.borderM > :nth-child(1) > .btn').click()
        cy.url()
            .should("not.include", "/login")
            .should("include", "/customer");

    })

    it("Should depoist successfully", () => {
        cy.visit(base_url+"#/login")

        cy.get('.borderM > :nth-child(1) > .btn').click()
        cy.url()
            .should("not.include", "/login")
            .should("include", "/customer");
        
        cy.get('#userSelect').select('Harry Potter')

    })
})
