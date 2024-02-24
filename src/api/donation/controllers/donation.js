'use strict';

/**
 * donation controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::donation.donation', ({strapi}) => ({
    async create (ctx) {
        const result = await super.create(ctx);

        const midtransClient = require('midtrans-client');
        // Create Snap API instance
        let snap = new midtransClient.Snap({
                isProduction : false,
                serverKey : 'SB-Mid-server-YEqaiznRRNuNf8mfAhGMprXc',
                clientKey : 'SB-Mid-client-ioIGcL9C3qp3et0j'
            });

        let parameter = {
            "transaction_details": {
                "order_id": result.data.id,
                "gross_amount": result.data.attributes.nominal
            }, "credit_card":{
                "secure" : true
            }
        };


        let response = await snap.createTransaction(parameter)
        return response;
    }
}));
