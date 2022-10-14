//sequelize连接mysql数据库

//导入sequelize模块
let Sequelize = require('sequelize');

//导出连接
let sequize = new Sequelize(config.mysqlOptions.database, config.mysqlOptions.username, config.mysqlOptions.password, {
  //连接地址
  host: config.mysqlOptions.host,
  port: config.mysqlOptions.port,
  //连接数据库类型
  dialect: config.mysqlOptions.dialect,

  //时区
  timezone: config.mysqlOptions.timezone,

  //数据库连接池
  pool: config.mysqlOptions.pool,
})
sequize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch((err) => {
    console.log('Unable to connect to the database:', err);
});
module.exports = sequize;