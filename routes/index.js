let controlaction = require(__basename + "/routesController/actions.js")
module.exports = (app) => {
    app.get('/test' ,controlaction.test)
}