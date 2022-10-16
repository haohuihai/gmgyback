let controlLaction = require(__basename + "/routesController/actions.js")
let controlUser = require(__basename + "/routesController/user.js")
module.exports = (app) => {
    app.get('/test', controlLaction.test)
    app.post('/login', controlUser.login)
}