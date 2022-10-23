const multer  = require('multer')
let controlAction = require(__basename + "/routesController/actions.js")
let controlUser = require(__basename + "/routesController/user.js")
let controlActions = require(__basename + "/routesController/actions.js")
const upload = multer({ dest: '../upload/article' })

module.exports = (app) => {
    app.get('/test', controlAction.test)
   
    app.post('/pubishAction', controlActions.pubishAction)
    app.post('/get_nearly_actions', controlActions.get_nearly_actions)


    app.post('/login', controlUser.login)
    app.post('/user/get_my_action', controlUser.get_my_action)
    app.post('/upload/action_image', upload.single('file'), controlActions.action_image)
    app.post('/upload/delete_a_image', controlActions.delete_a_image)
}