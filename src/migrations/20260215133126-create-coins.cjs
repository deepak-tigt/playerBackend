'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('coins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      currency_code: {
        type: Sequelize.STRING(10),
        allowNull:false,
        unique:true
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false
      },
      type:{
        type:Sequelize.STRING,
        allowNull:false
      },
      status:{
        type:Sequelize.STRING,
        allowNull: false,
        defaultValue:'active'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('now')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('coins');

  }
};