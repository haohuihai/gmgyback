//配置层
const Core = require('@alicloud/pop-core');


// // // 从环境变量中读取数据库配置
// const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

// const [host, port] = MYSQL_ADDRESS.split(":");

// 本地调试线上mysql
// const MysqlConfig = {
//   port: '23247',
//   host: 'sh-cynosdbmysql-grp-ca1lndnc.sql.tencentcdb.com',
//   username: 'root'
//   servicePort: 80
// }


// 本地数据库配置
// const MysqlConfig = {
//   port: '3306',
//   host: '127.0.0.1',
//   username: 'gmgy',
//   servicePort: 10000
// }

//  线上服务
const MysqlConfig = {
  port: '3306',
  host: '10.13.107.2',
  username: 'root',
  servicePort: 80
}

//服务器配置
exports.serverOptions = {
  //地址
  host: 'http://localhost',
  //端口
  port: MysqlConfig.servicePort
}



//mysql数据库配置
exports.mysqlOptions = {
  //数据库名称
  database: 'gmgy',
  //用户名
  username: MysqlConfig.username,
  // 端口号
  port: MysqlConfig.port,

  //密码
  password: 'Hhh123456',

  //连接地址
  host: MysqlConfig.host,
  //连接数据库类型
  dialect: 'mysql',
  //时区
  timezone: '+08:00',

  pool: {
    //最大连接数
    max: 5,

    //最小连接数
    min: 0,

    //连接超时, 单位ms
    acquire: 30000,

    //闲置时间, 单位mss
    idle: 10000
  }
}

//短信验证码登录
// exports.phoneLoginNumber = new Core({
//   accessKeyId: '',
//   accessKeySecret: 'GZqcVS4LBvUU0PLGzFQF8NN8aDdfGY',
//   endpoint: 'https://dysmsapi.aliyuncs.com',
//   apiVersion: '2017-05-25'
// });

//加盐配置
exports.saltOptions = {
  tokenSalt: '_tsalt'
}
// //短信服务参数
// exports.phoneQuery = {
//   accessKeyId: '',
//   accessKeySecret: 'GZqcVS4LBvUU0PLGzFQF8NN8aDdfGY',
//   endpoint: 'https://dysmsapi.aliyuncs.com',
//   apiVersion: '2017-05-25',
//   "TemplateCode": "SMS_204106953",
//   "SignName": "浩兰餐饮"

// }
