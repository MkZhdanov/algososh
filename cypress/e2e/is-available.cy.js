describe("Тестирование работоспособности приложения", () => {
  it("should be available on localhost:3000", () => {
    cy.visit("/");
    cy.contains("МБОУ АЛГОСОШ");
  });
});
