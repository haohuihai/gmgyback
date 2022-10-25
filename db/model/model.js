let User = require(__basename + '/db/model/user.js')
let Integral = require(__basename + '/db/model/integral.js')
let Action = require(__basename + '/db/model/action.js')
let UserAction = require(__basename + '/db/model/user_action.js')
module.exports = {
    User,
    Integral,
    Action,
    UserAction
}