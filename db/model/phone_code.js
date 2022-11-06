//code模型

//导入sequelize
let Sequelize = require('sequelize');

//获取模型类
let Model = Sequelize.Model;

//创建code模型，同时继承Model
class PhoneCode extends Model {}

//定义模型结构，映射为数据表结构
PhoneCode.init({
  //定义数据表字段，表结构

  //表id
  id: {
    //数据类型, INTEGER: 整型, UNSIGNED: 无符号
    type: Sequelize.INTEGER.UNSIGNED,

    //是否允许为null
    allowNull: false,

    //主键
    primaryKey: true,

    //自动递增
    autoIncrement: true,

    //备注
    comment: '表id'
  },
  //验证码
  code: {
    type: Sequelize.STRING(30),
    allowNull: false,
    defaultValue: '',
    comment: '验证码'
  },
  //手机号
  phone_number: {
    type: Sequelize.STRING(50),
    allowNull: false,
    defaultValue: '',
    comment: '手机号'
  }

}, {
  //配置
  // 默认为类的名称，即在这种情况下为`Code`。
  modelName: 'phone_code',

  //是否添加时间戳属性 (updatedAt, createdAt)
  timestamps: true,

  //是否开启假删除(逻辑删除), 真删除(物理删除)
  //不实际删除数据库记录，而是设置一个新 deletedAt 属性，其值为当前日期
  paranoid: true,

  //自动设置字段为蛇型（以_方式命名）命名规则
  underscored: true,
  freezeTableName: true,

  //连接实例
  sequelize
})
//force: true, 如果存在该表，则先删除该表，再创建新表，否则直接创建新表
//force: false, 如果存在该表，则不创建新表，否则创建新表
PhoneCode.sync({force: false});

//导出模型
module.exports = PhoneCode;

