describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  })

  it("should visit root", () => {
  });

  it("should navigate to Tuesday", () => {
    // Confirm page loads with monday selected
    cy.contains("[data-testid]", "Monday")
      .should("have.class", "day-list__item--selected")

    // Click tuesday and see if it is selected
    cy.contains("[data-testid]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  })
  
});