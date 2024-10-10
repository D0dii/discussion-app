"use strict";
const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const comments = [];

    for (let i = 0; i < 50; i++) {
      comments.push({
        author: faker.person.firstName(),
        content: faker.lorem.sentences(2),
        TopicId: faker.number.int({ min: 1, max: 15 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Comments", comments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
