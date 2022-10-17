//user模型

//导入sequelize
let Sequelize = require('sequelize');

//获取模型类
let Model = Sequelize.Model;

//创建user模型，同时继承Model
class Integral extends Model {}

//定义模型结构，映射为数据表结构
Integral.init({
  //定义数据表字段，表结构

  //表id
  integral_id: {
    //数据类型, BIGINT: 整型, UNSIGNED: 无符号
    type: Sequelize.BIGINT.UNSIGNED,
    //是否允许为null
    allowNull: false,
    //主键
    primaryKey: true,
    //自动递增
    autoIncrement: true,
    //备注
    comment: '积分id'
  },
  weixin_openid: {
    type: Sequelize.STRING(100),

    defaultValue: '',
    allowNull: true,
    comment: '微信登录openid'
  },
  current_value: {
    type: Sequelize.INTEGER(10),
    defaultValue: 0,
    allowNull: false,
    comment: '当前积分值'
  },

  max_integral_val: {
    type: Sequelize.INTEGER(10),
    defaultValue: 10000,
    allowNull: false,
    comment: '最大积分值'
  },
  integral_change_name: {
    type: Sequelize.STRING(10),
    defaultValue: 0,
    allowNull: true,
    comment: '变更名称'
  },
  integral_change_value: {
    type: Sequelize.STRING(100),
    defaultValue: '',
    allowNull: true,
    comment: '变更值'
  }
},
 {
  //配置
  // 默认为类的名称，即在这种情况下为`Integral`。
  modelName: 'integral',

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

Integral.sync({ alter: true })
//force: true, 如果存在该表，则先删除该表，再创建新表，否则直接创建新表
//force: false, 如果存在该表，则不创建新表，否则创建新表
Integral.sync({force: false})
//导出模型
module.exports = Integral;