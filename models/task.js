module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
      title: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      description: {
          type: DataTypes.TEXT,
      },
      status: {
          type: DataTypes.ENUM("Em andamento", "Finalizado"),
          allowNull: false,
      },
      priority: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
              min: 1,
              max: 10
          }
      }
  });

  Task.associate = (models) => {
      Task.belongsToMany(models.Tag, {
          through: "TaskTags",
          foreignKey: "taskId",
          otherKey: "tagId",
      });
  };

  return Task;
};
