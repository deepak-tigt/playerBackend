'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    // get the id for superadmin role 
    const [roles] = await queryInterface.sequelize.query(
      `SELECT id FROM "roles" WHERE name = 'superadmin' LIMIT 1 `
    )
    if (!roles.length) {
      throw new Error('Superadmin role not found in Roles table ! ');
    }
    const superadminRoleId = roles[0].id;

    // make the password hash
    const hashedPassword = await bcrypt.hash('superadmin@123',10);
   await queryInterface.bulkInsert("administrations",[
    {
      first_name:'Super',
      last_name:'Admin',
      email:'dkdodiya@trueigtech.com',
      password:hashedPassword,
      permissions: JSON.stringify({
        game_management: ['create', 'read', 'update', 'delete'],
        staff_management: ['create', 'read', 'update', 'delete'],
        player_management:['create','read','update','delete']
      }),
      role_id:superadminRoleId,
      created_by:1,
      created_at:new Date(),
      updated_at:new Date()
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('administrations',{
      email:'dkdodiya@trueigtech.com'
    })

  }
};
