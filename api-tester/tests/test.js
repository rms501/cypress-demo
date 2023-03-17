const responseData = require("../resource/responseData.json")
const shoppingCartSchema = require("../resource/responseSchema.js")
const axios = require("axios")
const sinon =require("sinon")
const { expect } = require("chai")
const chai = require("chai")
const jsonSchema = require("chai-json-schema")

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer eyJ0eXAAAAA1234567890",
};

const shoppingCartRoute = "https://everlywell.com/v9/shoppingCart"
const promoCodeRoute = "https://everlywell.com/v9/promoCode"

before(() => {
  sinon.stub(axios, "get").resolves({
    status: 200,
    data: responseData,
  })

  sinon.stub(axios, "post").resolves({
    status: 500,
  })

  chai.use(jsonSchema)
});

after(() => {
  sinon.restore()
});

describe("API Validation", () => {
  it("Subtotal price returned is correct", async () => {
    let data = await extractShoppingCartData()
    expect(data.subTotal).to.equal(calculateSubTotal(data));
  });

  it("Ensure routes security and data integrity", async () => {
    let beforeData = await extractShoppingCartData()

    const postRequestBody = {
        "userId": beforeData.userId,
        "sessionId": beforeData.sessionId,
        "discount": beforeData.subTotal
    }

    await axios.post(promoCodeRoute, postRequestBody, { headers: headers }).then((res) => {
        expect(res.status).to.equal(500)
    });

    let afterData = await extractShoppingCartData()

    matchContents(beforeData, afterData)
  });
});

function calculateSubTotal(data) {
    let itemCost = 0
    data.items.forEach(element => {
        itemCost = itemCost + (element.quantity * element.price)
    });
    itemCost = itemCost - data.discount
    
    return itemCost
}

const extractShoppingCartData = async () => {
    let data
    await axios.get(shoppingCartRoute, { headers: headers }).then((res) => {
        expect(res.status).to.equal(200)
        data = res.data
    })
    return data
}

function matchContents(before, after) {
    matchSchemas(before, after)

    expect(after.userId).to.equal(before.userId)
    expect(after.sessionId).to.equal(before.sessionId)
    expect(after.items).to.eql(before.items)
    expect(after.items).to.equal(before.items)
    expect(after.discount).to.equal(before.discount)
    expect(after.subTotal).to.equal(before.subTotal)
}

function matchSchemas(before, after) {
    expect(before).to.be.jsonSchema(shoppingCartSchema)
    expect(after).to.be.jsonSchema(shoppingCartSchema)
}