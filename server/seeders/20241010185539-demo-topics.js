"use strict";
const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const topics = [];

    for (let i = 0; i < 15; i++) {
      topics.push({
        title: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Topics", topics, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Topics", null, {});
  },
};
