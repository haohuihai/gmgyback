let controlLaction = require(__basename + "/routesController/actions.js")
let controlUser = require(__basename + "/routesController/user.js")
let controlActions = require(__basename + "/routesController/actions.js")
module.exports = (app) => {
    app.get('/test', controlLaction.test)
   
    app.post('/pubishAction', controlActions.pubishAction)


    app.post('/login', controlUser.login)
    app.post('/user/getMyAction', controlUser.getMyAction)
}