'use strict';
const {faker} = require("@faker-js/faker")
const bcrypt = require("bcrypt")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const total = 1000000;
    const batchSize = 10000;
    const hashedPassword = await bcrypt.hash("querty",10);
    const now = new Date()
    const runId = Math.floor(Date.now()/1000);

    for(let offset = 0;offset < total;offset+=batchSize){
      const users = [];

      for(let i = 0;i<Math.min(batchSize,total-offset);i++){
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email=`${runId}${offset+i}${faker.internet.email({firstName,lastName}).toLowerCase()}`
        const dateOfBirth = faker.date.birthdate({min:18, max:80,mode:"age"})

        users.push({
          first_name:firstName,
          last_name:lastName,
          email, 
          password:hashedPassword,
          date_of_birth:dateOfBirth.toISOString().slice(0,10),
          is_email_verified:true,
          created_at:now,
          updated_at:now

        })
      }
      await queryInterface.bulkInsert("users",users)

    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users",null)
  }
};
