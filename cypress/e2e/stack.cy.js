import {
  circle,
  circleDefault,
  circleChanging,
  circleContent,
} from "../constants/constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Проверка визуалиции компонента со стэком", () => {
  beforeEach(() => {
    cy.visit("/stack");
    cy.contains("Добавить").as("addButton");
    cy.contains("Удалить").as("deleteButton");
    cy.contains("Очистить").as("clearButton");
  });
  const array = ["14", "12", "7"];
  const addItem = (value) => {
    cy.get("input").type(value);
    cy.get("@addButton").should("not.be.disabled");
    cy.get("@addButton").click();
    cy.wait(SHORT_DELAY_IN_MS);
  };

  it("Кнопки заблокированы при пустом инпуте", () => {
    cy.contains("Стек");
    cy.get("input").should("be.empty");
    cy.get("@addButton").should("be.disabled");
    cy.get("@deleteButton").should("be.disabled");
    cy.get("@clearButton").should("be.disabled");
  });

  it("Добавление элементов в стек - корректно", () => {
    cy.get("input").type("11");
    cy.get("@addButton").should("not.be.disabled");
    cy.get("@addButton").click();
    cy.get("@addButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(circle)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(circleChanging));
    cy.get(circleContent).children("div:first").should("have.text", "top");

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains(circleDefault));
    cy.get("input").should("have.value", "");
    cy.get("@addButton").should("be.disabled");
    cy.get("@deleteButton").should("not.be.disabled");
    cy.get("@clearButton").should("not.be.disabled");
  });

  it("Удаление элементов из стека работает корректно", () => {
    array.map((item) => {
      addItem(item);
    });

    cy.get("@deleteButton").click();
    cy.get("@deleteButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));

    cy.get(circle).then((item) => {
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
    });
    cy.get(circleContent).then((item) => {
      cy.get(item[0]).children("div:first").should("not.have.text", "top");
      cy.get(item[1]).children("div:first").should("have.text", "top");
    });
  });

  it("Очистка стека работает корректно", () => {
    array.map((item) => {
      addItem(item);
    });

    cy.get("@clearButton").click();

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("input").should("be.empty");
    cy.get("@addButton").should("be.disabled");
    cy.get("@deleteButton").should("be.disabled");
    cy.get("@clearButton").should("be.disabled");
    cy.get(circle).should("not.exist");
  });
});
