describe("Тестирование переходов по страницам", () => {
  before(function () {
    cy.visit("/");
  });

  it("should open string page after click on link", () => {
    cy.visit("/recursion");
    cy.contains("Строка");
  });

  it("should open fibonacci page after click on link", () => {
    cy.visit("/fibonacci");
    cy.contains("Последовательность Фибоначчи");
  });

  it("should open sorting page after click on link", () => {
    cy.visit("/sorting");
    cy.contains("Сортировка массива");
  });

  it("should open stack page after click on link", () => {
    cy.visit("/stack");
    cy.contains("Стек");
  });

  it("should open queue page after click on link", () => {
    cy.visit("/queue");
    cy.contains("Очередь");
  });

  it("should open list page after click on link", () => {
    cy.visit("/list");
    cy.contains("Связный список");
  });
});
