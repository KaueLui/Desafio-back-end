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
      type: DataTypes.ENUM("Andamento", "Finalizado", "Pendente"),
      allowNull: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 10,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2, // Valor padrão temporário (use um ID válido da tabela Users)
      references: {
        model: "Users",
        key: "id",
      },
    },
  });

  Task.associate = (models) => {
    Task.belongsToMany(models.Tag, {
      through: "TaskTags",
      foreignKey: "taskId",
      otherKey: "tagId",
    });
    Task.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Task;
};