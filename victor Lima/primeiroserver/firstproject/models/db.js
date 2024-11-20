const Sequelize = require("sequelize");

//conexao com o banco de dados mysql
const sequelize = new Sequelize("postapp", "root", "", {
  host: "localhost",
  dialect: "mysql",
});


sequelize.authenticate()
.then(() => console.log('conectou ao banco'))
.catch((error) => console.log('error: ' + error))
module.exports = {
  Sequelize,
  sequelize,
};
