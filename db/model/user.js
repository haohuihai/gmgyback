//user模型

//导入sequelize
let Sequelize = require('sequelize');

//获取模型类
let Model = Sequelize.Model;

//创建user模型，同时继承Model
class User extends Model {}

//定义模型结构，映射为数据表结构
User.init({
  //定义数据表字段，表结构

  //表id
  userId: {
    //数据类型, BIGINT: 整型, UNSIGNED: 无符号
    type: Sequelize.BIGINT.UNSIGNED,
    //是否允许为null
    allowNull: false,
    //主键
    primaryKey: true,
    //自动递增
    autoIncrement: true,
    //备注
    comment: '用户id'
  },
  weixin_openid: {
    type: Sequelize.STRING(150),
    defaultValue: '',
    allowNull: true,
    comment: '微信登录openid'
  },
//   微信登录会话KEY
  session_key: {
    type: Sequelize.STRING(150),
    defaultValue: '',
    allowNull: true,
    comment: '会话KEY'
  },
//   服务端token
  access_token: {
    type: Sequelize.STRING(50),
    defaultValue: '',
    allowNull: true,
    comment: '服务端token'
  },

  //昵称
  nickname: {
    type: Sequelize.STRING(30),
    allowNull: true,
    defaultValue: '',
    comment: '昵称'
  },
  user_name: {
    type: Sequelize.STRING(30),
    allowNull: true,
    defaultValue: '',
    comment: '真实姓名'
  },
  unionid: {
    type: Sequelize.STRING(50),
    defaultValue: '',
    allowNull: true,
    comment: '用户唯一id'
  },
  //密码
  password: {
    type: Sequelize.STRING(32),
    allowNull: false,
    defaultValue: '',
    comment: '密码'
  },
  //用户头像
  avatar: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: 'http://localhost:10000/default.png',
      comment: '用户头像'
    },
  //   //性别
  gender: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 1,
    comment: '性别（0为女1为男）'
  },
  // 地址
  address: {
    type: Sequelize.STRING(100),
    allowNull: false,
    defaultValue: '',
    comment: '地址'
  },
 //  生日
  birthday : {
    type: Sequelize.STRING(100),
    allowNull: false,
    defaultValue: '',
    comment: '生日'
  },
  // 状态
  status: {
    type:Sequelize.INTEGER(1),
    defaultValue: 1,
    comment: '是否禁用  1 启用  0 禁用  2 注销'
  },
  // 手机号
  mobile: {
    type: Sequelize.STRING(15),
    allowNull: true,
    defaultValue: '',
    comment: '用户手机'
  },
  integral: {
    type: Sequelize.INTEGER(15),
    allowNull: false,
    defaultValue: 0,
    comment: '用户总积分'
  },
  certification_status: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    comment: '0，未实名，1，未通过，2已实名，'
  }
},
 {
  //配置
  // 默认为类的名称，即在这种情况下为`User`。
  modelName: 'user',

  //是否添加时间戳属性 (updatedAt, createdAt)
  timestamps: true,

  //是否开启假删除(逻辑删除), 真删除(物理删除)
  //不实际删除数据库记录，而是设置一个新 deletedAt 属性，其值为当前日期
  paranoid: true,
  //自动设置字段为蛇型（以_方式命名）命名规则
  underscored: true,
  freezeTableName: true,
  //连接实例
  sequelize,
})

User.sync({ alter: true })
//force: true, 如果存在该表，则先删除该表，再创建新表，否则直接创建新表
//force: false, 如果存在该表，则不创建新表，否则创建新表
User.sync({force: false})
//导出模型
module.exports = User;