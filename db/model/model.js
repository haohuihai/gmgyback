let User = require(__basename + '/db/model/user.js')
let Integral = require(__basename + '/db/model/integral.js')
let Action = require(__basename + '/db/model/action.js')
let UserAction = require(__basename + '/db/model/user_action.js')
let UserVerify = require(__basename + '/db/model/user_verify.js')
let PhoneCode = require(__basename + '/db/model/phone_code.js')
let UserActionTime = require(__basename + '/db/model/user_action_time.js')
module.exports = {
    User,
    Integral,
    Action,
    UserAction,
    UserVerify,
    PhoneCode,
    UserActionTime
}