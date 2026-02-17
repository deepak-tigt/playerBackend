'use strict';
const {STATUS_TYPE} = require("../utils/constants")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('coins', [
      {
        currency_code: 'GC',
        name: 'Gold Coin',
        type: 'demo',
        status: STATUS_TYPE.ACTIVE,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        currency_code: 'SC',
        name: 'Sweeps Coin',
        type: 'sum of PSC + RSC',
        status: STATUS_TYPE.ACTIVE,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        currency_code: 'RSC',
        name: 'Redeemable Sweeps Coin',
        type: 'redeemable',
        status: STATUS_TYPE.ACTIVE,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        currency_code: 'PSC',
        name: 'Purchased Sweeps Coin',
        type: 'purchased',
        status: STATUS_TYPE.ACTIVE,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('coins', null);
  }
};
