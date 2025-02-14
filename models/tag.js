module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define("Tag", {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      color: {
          type: DataTypes.STRING,
          allowNull: false,
      },
  });

  Tag.associate = (models) => {
      Tag.belongsToMany(models.Task, {
          through: "TaskTags",
          foreignKey: "tagId",
          otherKey: "taskId",
      });
  };

  return Tag;
};
