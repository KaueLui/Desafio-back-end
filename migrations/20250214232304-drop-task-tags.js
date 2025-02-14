"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("TaskTags");
    },

    down: async (queryInterface, Sequelize) => {
    },
};
