let User = require('./user')
let UserAction = require('./user_action')
User.belongsToMany(UserAction, {
  through: {
      model: UserConnectAction,
      unique: false,
  },
  foreignKey: 'postId', //通过外键postId
  constraints: false
});
UserAction.belongsToMany(User, {
  through: {
      model: UserConnectAction,
      unique: false,
  },
  foreignKey: 'weixin_openid', //通过外键tagId
  constraints: false
});

