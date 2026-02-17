'use strict';
const {faker} = require("@faker-js/faker")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const total = 100;
    const categories = [];
    const now = new Date();

    for(let i=0;i < total ; i++){
      const name=`${i}${faker.commerce.department()}`

      categories.push({
        name,
        description:`${name} games are in this category`,
        status:true,
        created_at:now,
        updated_at:now
      })
    }
    await queryInterface.bulkInsert("gameCategories",categories)
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("gameCategories",null)
  }
};
