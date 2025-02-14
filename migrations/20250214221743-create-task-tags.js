module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("TaskTags", {
      taskId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tasks",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      tagId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tags",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("TaskTags");
  },
};
