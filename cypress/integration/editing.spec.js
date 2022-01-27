describe("Editing", () => {
  beforeEach(() => {
    cy.visit("/api/debug/reset")

    cy.visit("/");
 
    cy.contains("Monday");
  })

  it("should edit an interview", () => {

    cy.contains("article", "Archie")
      .get("[data-testid='editImg']").first()
      .invoke("show")
      .click()

    cy.get("article").eq(0)
      .find("[data-testid]")
      .clear()
      .type("Nikhil 2")

    cy.get("article").eq(0)
    .get(".interviewers__item").eq(1)
    .click()

    cy.get("article").eq(0)
      .contains("Save").click()


    cy.get("article").eq(0)
      .contains("Nikhil");

  })

})