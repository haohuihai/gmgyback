const multer  = require('multer')
let controlUser = require(__basename + "/routesController/user.js")
let controlActions = require(__basename + "/routesController/actions.js")
const upload = multer({ dest: '../upload/action' })

module.exports = (app) => {
    app.get('/test', controlActions.test)
   
    app.post('/action/pubish_action', controlActions.pubish_action)
    app.post('/action/get_lately_actions', controlActions.get_lately_actions)
    app.get('/action/get_my_action', controlActions.get_my_action)
    app.post('/action/join_action', controlActions.join_action)
    app.get('/action/get_action_detail', controlActions.get_action_detail)
    app.get('/action/get_join_action_user', controlActions.get_join_action_user)


    app.post('/user/login', controlUser.login)
    app.post('/upload/action_image', upload.single('file'), controlActions.action_image)
    app.get('/upload/delete_image', controlActions.delete_image)
    app.post('/user/certification', controlUser.certification)
    app.post('/user/sure_certification', controlUser.sure_certification)


    
}