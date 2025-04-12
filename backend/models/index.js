const { Sequelize } = require("sequelize");
const config = require("../config/config.json")["development"];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Task = require("./task")(sequelize, Sequelize);
db.Tag = require("./tag")(sequelize, Sequelize);
db.User = require("./user")(sequelize);

db.Task.belongsToMany(db.Tag, { through: "TaskTags" });
db.Tag.belongsToMany(db.Task, { through: "TaskTags" });

module.exports = db;
