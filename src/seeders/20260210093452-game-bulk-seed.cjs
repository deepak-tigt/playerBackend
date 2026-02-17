'use strict';
const {faker} = require("@faker-js/faker")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const total = 1000;
    const games = [];
    const now = new Date();

    for(let i=0;i<total;i++){
      const name = `${i}${faker.word.words(2)}`

      games.push({
        name,
        category_id:faker.number.int({min:1,max:111}),
        status:true,
        created_at:now,
        updated_at:now
      })
    }
    await queryInterface.bulkInsert("games",games)
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete("games",null)
  }
};
