"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "google_id", {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });

    await queryInterface.addColumn("users", "provider", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "local",
    });

    await queryInterface.changeColumn("users", "password", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "password", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    
    await queryInterface.removeColumn("users", "provider");

    await queryInterface.removeColumn("users", "google_id");
  },
};
