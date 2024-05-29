import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { mainCircle } from "../constants/constants";

describe("Проверка визуалиции компонента с последовательностью Фибоначчи", () => {
  beforeEach(() => {
    cy.visit("/fibonacci");
  });

  it("Кнопка заблокирована при пустом инпуте", () => {
    cy.contains("Последовательность Фибоначчи");
    cy.get("input").should("be.empty");
    cy.get("button").last().should("be.disabled");
  });

  it("Визуализация алгоритма работает корректно", () => {
    cy.clock();
    cy.get("input").as("input");
    cy.get("button").last().as("button");
    cy.get("@input").type("3");
    cy.get("@button").should("not.be.disabled").click();
    cy.get("@button")
      .invoke("attr", "class")
      .then((className) => expect(className).contains("loader"));

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(mainCircle).then((item) => {
      cy.get(item[0]).children().should("have.text", "1");
    });

    cy.tick(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(mainCircle).then((item) => {
      cy.get(item[0]).children().should("have.text", "1");
      cy.get(item[1]).children().should("have.text", "1");
    });

    cy.tick(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(mainCircle).then((item) => {
      cy.get(item[0]).children().should("have.text", "1");
      cy.get(item[1]).children().should("have.text", "1");
      cy.get(item[2]).children().should("have.text", "2");
    });

    cy.tick(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(mainCircle).then((item) => {
      cy.get(item[0]).children().should("have.text", "1");
      cy.get(item[1]).children().should("have.text", "1");
      cy.get(item[2]).children().should("have.text", "2");
      cy.get(item[3]).children().should("have.text", "3");
    });
  });
});
