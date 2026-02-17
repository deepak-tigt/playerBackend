'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
    {
      name: 'superadmin',
      level: 1,
      permissions: JSON.stringify({
        game_management: ['create', 'read', 'update', 'delete'],
        staff_management: ['create', 'read', 'update', 'delete'],
        player_management:['create','read','update','delete']

      }),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'admin',
      level: 2,
      permissions: JSON.stringify({
        game_management: ['create', 'read', 'update', 'delete'],
        staff_management: ['create', 'read', 'update', 'delete'],
        player_management:['create','read','update','delete']
      }),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'manager',
      level: 3,
      permissions: JSON.stringify({
        game_management: ['create', 'read', 'update','delete'],
        staff_management: ['create', 'read', 'update','delete'],
        player_management:['create','read','update','delete']
      }),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'support',
      level: 4,
      permissions: JSON.stringify({
        game_management: ['create', 'read', 'update','delete'],
        staff_management: ['create', 'read', 'update','delete'],
        player_management:['create','read','update','delete']

      }),
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles',{
      name:['superadmin','admin','manager','support']
    })
  }
};
