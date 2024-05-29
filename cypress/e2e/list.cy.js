import {
  circle,
  circleSmall,
  circleDefault,
  circleChanging,
  circleModified,
  circleContent,
} from "../constants/constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Проверка визуалиции компонента со списоком", () => {
  beforeEach(() => {
    cy.visit("/list");
    cy.get("[data='input-value']").as("inputValue");
    cy.get("[data='input-index']").as("inputIndex");
    cy.contains("Добавить в head").as("addToHeadButton");
    cy.contains("Добавить в tail").as("addToTailButton");
    cy.contains("Удалить из head").as("deleteFromHeadButton");
    cy.contains("Удалить из tail").as("deleteFromTailButton");
    cy.contains("Добавить по индексу").as("addByIndexButton");
    cy.contains("Удалить по индексу").as("deleteByIndexButton");
  });

  const getDataFromCircle = (array) => {
    cy.get(circle).then((item) => {
      cy.get(item)
        .children()
        .each((el) => {
          array.push(el.text().trim());
        });
    });
  };

  it("Кнопки заблокированы при пустом инпуте", () => {
    cy.contains("Связный список");
    cy.get("@inputValue").should("be.empty");
    cy.get("@inputIndex").should("be.empty");
    cy.get("@addToHeadButton").should("be.disabled");
    cy.get("@addToTailButton").should("be.disabled");
    cy.get("@deleteFromHeadButton").should("not.be.disabled");
    cy.get("@deleteFromTailButton").should("not.be.disabled");
    cy.get("@addByIndexButton").should("be.disabled");
    cy.get("@deleteByIndexButton").should("be.disabled");
  });

  it("Добавление элемента в head работает корректно", () => {
    const number = "1";
    cy.get("@inputValue").type(number);
    cy.get("@addToHeadButton").should("not.be.disabled");
    cy.get("@addToHeadButton").click();

    cy.get("@addToHeadButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(circleContent).then((item) => {
      cy.get(item[0])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[0]).find(circleSmall).children().should("have.text", number);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
      cy.get(item[0]).children().should("have.text", number);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
    });
  });

  it("Удаление элемента из head работает корректно", () => {
    let circleData = [];
    getDataFromCircle(circleData);
    cy.get("@deleteFromHeadButton").should("not.be.disabled");
    cy.get("@deleteFromHeadButton").click();

    cy.get("@deleteFromHeadButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(circleContent).then((item) => {
      cy.get(item[0])
        .children()
        .then((item) => {
          cy.get(item[1]).children().should("be.empty");
        });
    });
    cy.get(circleContent).then((item) => {
      cy.get(item[0])
        .get(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[0])
        .get(circleSmall)
        .children()
        .should("have.text", circleData[0]);
    });
  });

  it("Добавление элемента в tail работает корректно", () => {
    const number = "1";
    let circleData = [];
    getDataFromCircle(circleData);
    cy.get("@inputValue").type(number);
    cy.get("@addToTailButton").should("not.be.disabled");
    cy.get("@addToTailButton").click();

    cy.get("@addToTailButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(circleContent).then((item) => {
      cy.get(item[circleData.length - 1])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[circleData.length - 1])
        .find(circleSmall)
        .children()
        .should("have.text", number);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[circleData.length])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
      cy.get(item[circleData.length]).children().should("have.text", number);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[circleData.length])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
    });
  });

  it("Удаление элемента из tail работает корректно", () => {
    let circleData = [];
    getDataFromCircle(circleData);
    cy.get("@deleteFromTailButton").should("not.be.disabled");
    cy.get("@deleteFromTailButton").click();

    cy.get("@deleteFromTailButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(circleContent).then((item) => {
      cy.get(item[circleData.length - 1])
        .children()
        .then((item) => {
          cy.get(item[1]).children().should("be.empty");
        });
    });
    cy.get(circleContent).then((item) => {
      cy.get(item[circleData.length - 1])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[circleData.length - 1])
        .find(circleSmall)
        .children()
        .should("have.text", circleData[circleData.length - 1]);
    });
  });

  it("Добавление элемента по индексу работает корректно", () => {
    let circleData = [];
    getDataFromCircle(circleData);
    let index = 1;
    let number = "1";
    cy.get("@inputIndex").type(index);
    cy.get("@inputValue").type(number);
    cy.get("@addByIndexButton").should("not.be.disabled");
    cy.get("@addByIndexButton").click();

    cy.get("@addByIndexButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleContent).then((item) => {
      cy.get(item[0])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[0]).find(circleSmall).children().should("have.text", number);
      cy.get(item[0])
        .find(`[class*=${"circle_default"}]`)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleContent).then((item) => {
      cy.get(item[0])
        .find(`[class*=${"circle_changing"}]`)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[1])
        .find(`[class*=${"circle_default"}]`)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
      cy.get(item[1])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[1]).find(circleSmall).children().should("have.text", number);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).then((item) => {
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
    });
  });

  it("Удаление элемента по индексу работает корректно", () => {
    let circleData = [];
    getDataFromCircle(circleData);
    let index = 1;
    cy.get("@inputIndex").type(index);
    cy.get("@deleteByIndexButton").should("not.be.disabled");
    cy.get("@deleteByIndexButton").click();

    cy.get("@deleteByIndexButton")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));

      cy.wait(SHORT_DELAY_IN_MS);
    });

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));

      cy.wait(SHORT_DELAY_IN_MS);
    });

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
      cy.get(item[1]).children().should("have.text", "");
    });

    cy.get(circleContent).then((item) => {
      cy.get(item[index])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[1])
        .find(circleSmall)
        .children()
        .should("have.text", circleData[index]);
    });
  });
});
