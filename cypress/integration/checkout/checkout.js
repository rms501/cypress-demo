import { Before, Given, When, Then } from "cypress-cucumber-preprocessor/steps"
import { idMapper, idExtractor, calculateDiscount } from "../../support/common"

const { expect } = require("chai")

let items = 0
let bulkDiscount = 0
let promoCode = ""

Before(() => {
    cy.visit('/')
})

Given("a cart icon is present", () => {
    cy.getById(idExtractor("cart icon", idMapper)).then(elem => {
        items = parseInt(elem.text())
    })
})
  
When("cart items are equal to or greater than {int}", (count) => {
    expect(items).to.be.gte(count)
})

Then("a user should see an appropriate discount", () => {
    let itemCost = 0
    cy.getById(idExtractor("item cost label", idMapper)).then(elem => {
        itemCost = parseInt(elem.text())
    })
    
    cy.getById(idExtractor("discount label", idMapper)).then(elem => {
        bulkDiscount = parseInt(elem.text())
    })

    expect(calculateDiscount(items, itemCost)).to.equal(discount)
})

When("a user manually inputs promo code {string} to promo code field", (enteredPromoCode, id) => {
    promoCode = enteredPromoCode
    cy.getAndTypeById(idExtractor("promo code field", idMapper), promoCode)
})

Then("the promo code should be valid", () => {
    // normally a lookup or calcuation would be performed here, using fixture since this is abstract exercise
    cy.fixture("promoCode.json").then(data => {
        expect(promoCode).to.equal(data.promoCode)
    })
})

Then("the higher savings should be applied", () => {
    let updatedDiscount = 0
    cy.getById(idExtractor("discount label", idMapper)).then(elem => {
        updatedDiscount = parseInt(elem.text())
    })

    cy.fixture("promoCode.json").then(data => {
        let promoDiscount = data.discountValue
        if (bulkDiscount >= promoDiscount) {
            expect(updatedDiscount).to.equal(bulkDiscount)
        } else {
            expect(updatedDiscount).to.equal(promoDiscount)
        }
    })
})