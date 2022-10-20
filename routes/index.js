let controlLaction = require(__basename + "/routesController/actions.js")
let controlUser = require(__basename + "/routesController/user.js")
let controlActions = require(__basename + "/routesController/actions.js")
module.exports = (app) => {
    app.get('/test', controlLaction.test)
   
    app.post('/pubishAction', controlActions.pubishAction)
    app.post('/get_nearly_actions', controlActions.get_nearly_actions)


    app.post('/login', controlUser.login)
    app.post('/user/get_my_action', controlUser.get_my_action)
}