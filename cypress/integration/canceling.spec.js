describe("Editing", () => {
  beforeEach(() => {
    cy.visit("/api/debug/reset")
  })

it("should edit an interview", () => {

  cy.visit("/");

  cy.get("[data-testid='deleteImg']")
    .invoke("show")
    .click()

  cy.contains("Confirm").click()

  cy.get("article").eq(0)
  .find("[data-testimg]")
})

})