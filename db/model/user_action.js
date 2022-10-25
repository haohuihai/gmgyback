//user模型

//导入sequelize
let Sequelize = require('sequelize');

//获取模型类
let Model = Sequelize.Model;

//创建user模型，同时继承Model
class UserAction extends Model {}

//定义模型结构，映射为数据表结构
UserAction.init({
  //定义数据表字段，表结构

  //表id
  my_action_id: {
    //数据类型, BIGINT: 整型, UNSIGNED: 无符号
    type: Sequelize.BIGINT.UNSIGNED,
    //是否允许为null
    allowNull: false,
    //主键
    primaryKey: true,
    //自动递增
    autoIncrement: true,
    //备注
    comment: '个人活动记录id'
  },
  action_id: {
    type: Sequelize.STRING(10),
    defaultValue: '',
    allowNull: true,
    comment: '活动id'
  },
  weixin_openid: {
    type: Sequelize.STRING(150),
    defaultValue: '',
    allowNull: true,
    comment: '微信登录openid'
  },
  start_time: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
    allowNull: true,
    comment: '开始时间'
  },
  end_time: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
    allowNull: true,
    comment: '结束时间'
  },

  late_time: {
    type: Sequelize.STRING(30),
    allowNull: true,
    defaultValue: '',
    comment: '迟到时间'
  }
},
 {
  //配置
  // 默认为类的名称，即在这种情况下为`UserAction`。
  modelName: 'user_action',

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

UserAction.sync({ alter: true })
//force: true, 如果存在该表，则先删除该表，再创建新表，否则直接创建新表
//force: false, 如果存在该表，则不创建新表，否则创建新表
UserAction.sync({force: false})
//导出模型
module.exports = UserAction;