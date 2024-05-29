import {
  circle,
  circleDefault,
  circleChanging,
  circleContent,
} from "../constants/constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Проверка визуалиции компонента с очередью", () => {
  beforeEach(() => {
    cy.visit("/queue");
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
    cy.contains("Очередь");
    cy.get("input").should("be.empty");
    cy.get("@addButton").should("be.disabled");
    cy.get("@deleteButton").should("be.disabled");
    cy.get("@clearButton").should("be.disabled");
  });

  it("Добавление элементов в очередь работает корректно", () => {
    cy.get("input").type("14");
    cy.get("@addButton").click();

    cy.get("@addButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleContent).then((item) => {
      cy.get(item[0]).children("div:first").should("have.text", "head");
      cy.get(item[0]).children("div:last").should("have.text", "tail");
    });
    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
    });
    cy.get("input").should("be.empty");
    cy.get("@addButton").should("be.disabled");
    cy.get("@deleteButton").should("not.be.disabled");
    cy.get("@clearButton").should("not.be.disabled");

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("input").type("21");
    cy.get("@addButton").click();
    cy.get("@addButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(circle).then((item) => {
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleContent).then((item) => {
      cy.get(item[0]).children("div:first").should("have.text", "head");
      cy.get(item[0]).children("div:last").should("not.have.text", "tail");
      cy.get(item[1]).children("div:last").should("have.text", "tail");
    });
    cy.get(circle).then((item) => {
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
    });
    cy.get("input").should("be.empty");
    cy.get("@addButton").should("be.disabled");
    cy.get("@deleteButton").should("not.be.disabled");
    cy.get("@clearButton").should("not.be.disabled");

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("input").type("63");
    cy.get("@addButton").click();

    cy.get("@addButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(circle).then((item) => {
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleContent).then((item) => {
      cy.get(item[0]).children("div:first").should("have.text", "head");
      cy.get(item[1]).children("div:last").should("not.have.text", "tail");
      cy.get(item[2]).children("div:last").should("have.text", "tail");
    });
    cy.get(circle).then((item) => {
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
    });
    cy.get("input").should("be.empty");
    cy.get("@addButton").should("be.disabled");
    cy.get("@deleteButton").should("not.be.disabled");
    cy.get("@clearButton").should("not.be.disabled");
  });

  it("Удаление из очереди работает корректно", () => {
    array.map((item) => {
      addItem(item);
    });

    cy.get("@deleteButton").click();
    cy.get("@deleteButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleContent).then((item) => {
      cy.get(item[0]).children("div:first").should("not.have.text", "head");
      cy.get(item[1]).children("div:first").should("have.text", "head");
      cy.get(item[2]).children("div:last").should("have.text", "tail");
    });
    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
    });
  });

  it("Очистка из очереди работает корректно", () => {
    array.map((item) => {
      addItem(item);
    });

    cy.get("@clearButton").click();
    cy.get("@clearButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("input").should("be.empty");
    cy.get("@addButton").should("be.disabled");
    cy.get("@deleteButton").should("be.disabled");
    cy.get("@clearButton").should("be.disabled");
    cy.get(circle).children().nextAll().should("not.exist");
  });
});
