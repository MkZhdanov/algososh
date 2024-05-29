import { DELAY_IN_MS } from "../../src/constants/delays";
import {
  circle,
  circleDefault,
  circleChanging,
  circleModified,
} from "../constants/constants";

describe("Проверка визуалиции компонента с разворотом строки", () => {
  beforeEach(() => {
    cy.visit("/recursion");
  });

  it("Кнопка заблокирована при пустом инпуте", () => {
    cy.contains("Строка");
    cy.get("input").should("be.empty");
    cy.get("button").last().should("be.disabled");
  });

  it("Строка разворачивается корректно", () => {
    cy.get("input").as("input");
    cy.get("button").last().as("button");
    cy.get("@input").type("12345");
    cy.get("@button").should("not.be.disabled").click();
    cy.get("@button")
      .invoke("attr", "class")
      .then((className) => expect(className).contains("loader"));

    cy.get(circle).as("circle");
    cy.get("@circle").then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleChanging));
      cy.get(item[0]).children().should("have.text", "1");

      cy.get(item[1])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleDefault));
      cy.get(item[1]).children().should("have.text", "2");

      cy.get(item[2])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleDefault));
      cy.get(item[2]).children().should("have.text", "3");

      cy.get(item[3])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleDefault));
      cy.get(item[3]).children().should("have.text", "4");

      cy.get(item[4])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleChanging));
      cy.get(item[4]).children().should("have.text", "5");
    });

    cy.wait(DELAY_IN_MS);

    cy.get("@circle").then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleModified));
      cy.get(item[0]).children().should("have.text", "5");

      cy.get(item[1])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleChanging));
      cy.get(item[1]).children().should("have.text", "2");

      cy.get(item[2])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleDefault));
      cy.get(item[2]).children().should("have.text", "3");

      cy.get(item[3])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleChanging));
      cy.get(item[3]).children().should("have.text", "4");

      cy.get(item[4])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleModified));
      cy.get(item[4]).children().should("have.text", "1");
    });

    cy.wait(DELAY_IN_MS);

    cy.get("@circle").then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleModified));
      cy.get(item[0]).children().should("have.text", "5");

      cy.get(item[1])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleModified));
      cy.get(item[1]).children().should("have.text", "4");

      cy.get(item[2])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleModified));
      cy.get(item[2]).children().should("have.text", "3");

      cy.get(item[3])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleModified));
      cy.get(item[3]).children().should("have.text", "2");

      cy.get(item[4])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleModified));
      cy.get(item[4]).children().should("have.text", "1");
    });

    cy.wait(DELAY_IN_MS);

    cy.get("@input").should("be.empty");
    cy.get("@button").should("be.disabled");
  });
});
