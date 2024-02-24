'use strict';

/**
 * donation-callback-history controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::donation-callback-history.donation-callback-history', ({strapi}) => ({
    async create (ctx) {
        let request = ctx.request.body;

        let params = {}

        if (request.transaction_status == 'settlement') {
            params = {'data':{'donationStatus':'Diterima'}}
        } else {
            params = {'data':{'donationStatus':'Gagal'}}            
        }

        let updatedDonation = await strapi.service('api::donation.donation').update(request.order_id, params);
        
        console.log(request)
        return {'data': request}
    }
}));
