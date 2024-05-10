describe("homepage spec", () => {
  it("country form should work correctly", () => {
    cy.visit("http://localhost:3000");
    //select the country select button and click it
    cy.get("#cy-country-select button").click();
    //press the `v` key 3 times (to find Vietnam)
    cy.get("body").type("v".repeat(3));
    //press enter to select Vietnam
    cy.get("body").type("{enter}");
    //find the submit button and expect it to be disabled
    cy.get("#cy-submit-button").should("be.disabled");
    //select the state select button and click it
    cy.get("#cy-state-select button").click();
    //press the `h` key 3 times (to find Hanoi)
    cy.get("body").type("h".repeat(3));
    //press enter to select Hanoi
    cy.get("body").type("{enter}");
    //find the submit button and expect it to be enabled
    cy.get("#cy-submit-button").should("not.be.disabled");
    //click the submit button
    cy.get("#cy-submit-button").click();
    //the text of the toast should be "Country: Vietnam" somewhere in the page
    cy.contains("Country: Vietnam").should("exist");
    // the text of the toast should be "State: Hà Nội" somewhere in the pagepaNội
    cy.contains("State: Hà Nội").should("exist");
  });
});
