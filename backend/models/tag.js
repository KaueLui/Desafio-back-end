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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    });
  
    Tag.associate = (models) => {
      Tag.belongsToMany(models.Task, {
        through: "TaskTags",
        foreignKey: "tagId",
        otherKey: "taskId",
      });
      Tag.belongsTo(models.User, { foreignKey: "userId" });
    };
  
    return Tag;
  };