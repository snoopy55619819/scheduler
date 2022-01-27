describe("Booking", () => {
  
    beforeEach(() => {
      cy.visit("/api/debug/reset")
    })

  it("should book an interview", () => {
    
    cy.visit("/");

    cy.contains("article", "1pm")
      .find("[data-testimg]")
      .click()
    
    cy.get("article").eq(1)
      .find("[data-testid]")
      .type("Nikhil Tallapureddy")

    cy.get("article").eq(1)
      .get(".interviewers__item").first().click()

    cy.get("article").eq(1)
      .contains("Save").click()
      
    cy.get("main").eq(1)
      .should("have.class", "appointment__card appointment__card--show");
  })

})