export const idMapper = [
    [ "cart icon", "cart-icon" ],
    [ "item cost label", "item-cost-label" ],
    [ "discount label", "discount-label" ],
    [ "promo code field", "promo-code-field" ],
    [ "purchase button", "purchase-button" ],
    [ "purchase confirmation label", "purchase-confirmation-label" ]
]

export function idExtractor(id, mapper) {
    let idToReturn = id
    for (let i = 0; i < mapper.length; i++) {
        if (mapper[i][0] == id) {
            idToReturn = mapper[i][1]
        }
    }
    return idToReturn
}

export function calculateDiscount(items, itemCost) {
    let discountCounter = 0
    while (items >= 5) {
        discountCounter++
        items = items - 5
    }
    return discountCounter * itemCost
}