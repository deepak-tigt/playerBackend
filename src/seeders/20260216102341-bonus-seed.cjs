'use strict';
const { STATUS_TYPE, BONUS_TYPE } = require('../utils/constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('bonuses', [
      {
        title: 'Welcome Bonus',
        bonus_type: BONUS_TYPE.WELCOME_BONUS,
        sc_amount: 5,
        gc_amount: 1000,
        status: STATUS_TYPE.ACTIVE,
        description: 'New user welcome bonus on first registration ',
        terms: 'Valid for new players only. Must verify email to claim.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Birthday Bonus',
        bonus_type: BONUS_TYPE.BIRTHDAY_BONUS,
        sc_amount: 10,
        gc_amount: 2000,
        status: STATUS_TYPE.ACTIVE,
        description: 'Birthday gift for loyal players',
        terms: 'Issued on players birthday. Account must be active.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Anniversary Bonus',
        bonus_type: BONUS_TYPE.ANNIVERSARY_BONUS,
        sc_amount: 10,
        gc_amount: 2000,
        status: STATUS_TYPE.ACTIVE,
        description: 'Account anniversary reward',
        terms: 'Issued on account anniversary date. Must be active member.',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bonuses', null);

  }
};
