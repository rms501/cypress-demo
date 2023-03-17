import { When } from "cypress-cucumber-preprocessor/steps"
import { idMapper, idExtractor } from "../../support/common"

When("a user clicks {string}", (elem) => {
  cy.getAndClickById(idExtractor(elem, idMapper))
})

Then("the {string} element should exist", (elem) => {
  cy.getById(idExtractor(elem, idMapper)).should("exist")
})