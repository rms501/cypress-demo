const shoppingCartSchema = {
    title: 'shopping cart schema v1',
    additionalProperties: false,
    type: 'object',
    required: ['userId', 'sessionId', 'items', 'discount', 'subTotal'],
    properties: {
        userId: {
            type: 'number'
        },
        sessionId: {
            type: 'string'
        },
        items: {
            type: 'array',
            items: {
                type: [ 'object' ],
                required: ['name', 'quantity', 'price'],
                properties: {
                    name: 'string',
                    quanity: 'number',
                    price: 'number'
                }
            }
        },
        discount: 'number',
        subTotal: 'number'
    }
}

module.exports = { shoppingCartSchema }