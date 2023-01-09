const multer  = require('multer')
let controlUser = require(__basename + "/routesController/user.js")
let controlActions = require(__basename + "/routesController/actions.js")
const upload = multer({ dest: '../upload/action' })

module.exports = (app) => {
    app.get('/test', controlActions.test)
    
    // 活动
    // 发布活动
    app.post('/action/pubish_action', controlActions.pubish_action)
    // 获取最近活动
    app.post('/action/get_lately_actions', controlActions.get_lately_actions)
    // 获取我的活动
    app.get('/action/get_my_action', controlActions.get_my_action)
    // 加入活动
    app.post('/action/join_action', controlActions.join_action)
    // 获取活动详情
    app.get('/action/get_action_detail', controlActions.get_action_detail)
    // 获取参加当前活动的所有用户
    app.get('/action/get_join_action_user', controlActions.get_join_action_user)
    // 获取所有活动
    app.get('/action/all_action_list',  controlActions.all_action_list)

    /**************************************/
    // 上传图片
    app.post('/upload/action_image', upload.single('file'), controlActions.action_image)
    // 删除图片
    app.get('/upload/delete_image', controlActions.delete_image)

    /**************************************/

    
    //验证登录
    app.use(controlUser.validLogin);
    // 获取用户信息
    app.get('/user/get_user_info', controlUser.get_user_info)
    // 用户登录
    app.post('/user/login', controlUser.login)
    // 获取用户token
    app.post('/user/get_token', controlUser.get_token)
    // 用户认证
    app.post('/user/certification', controlUser.certification)
    // 用户认证确认
    app.post('/user/sure_certification', controlUser.sure_certification)
    // 获取手机号
    app.post('/user/get_phone_code', controlUser.get_phone_code)
    // 获取所有用户
    app.get('/user/all_user_list',  controlUser.all_user_list)
    // 修改用户信息
    app.post('/user/set_user_info', controlUser.set_user_info)

    
}