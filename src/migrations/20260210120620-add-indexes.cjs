"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // indexing for user table
    // index on email
    await queryInterface.addIndex("users", ["email"], {
      name: "users_email_index",
      unique: true,
    });

    // index for sorting with created at
    await queryInterface.addIndex("users", ["created_at"], {
      name: "users_createdAt_index",
    });

    // indexing for games 
    // index for categoryId
    await queryInterface.addIndex("games", ["category_id"], {
      name: "games_category_status_index",
    });

    // index for game name 
    await queryInterface.addIndex("games", ["name"], {
      name: "games_name_index",
    });

    // indexing for gameCategory 
    // index for category name 
    await queryInterface.addIndex("gameCategories", ["name"], {
      name: "gamecategories_name_index",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("users", "users_email_index");
    await queryInterface.removeIndex("users", "users_createdAt_index");

    await queryInterface.removeIndex("games", "games_category_status_index");
    await queryInterface.removeIndex("games", "games_name_index");

    await queryInterface.removeIndex("gameCategories", "gamecategories_name_index");

  },
};
