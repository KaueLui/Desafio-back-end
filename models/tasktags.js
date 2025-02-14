module.exports = (sequelize, DataTypes) => {
  const TaskTags = sequelize.define(
    "TaskTags",
    {
      taskId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tasks",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      tagId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tags",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      timestamps: false,
    }
  );

  return TaskTags;
};
