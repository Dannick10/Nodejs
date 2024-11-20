const Sequelize = require("sequelize");

//conexao com o banco de dados mysql
const sequelize = new Sequelize("postapp", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = {
  Sequelize,
  sequelize,
};
