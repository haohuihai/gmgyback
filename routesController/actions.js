//路由控制器

//导入处理时间模块 monent
let moment = require("moment");

//导入sequelize
let Sequelize = require("sequelize");

//导入API
let api = require(__basename + "/api/api.js");
//导入工具模块
let utils = require(__basename + "/utils/utils.js");
// const BroadcastChannel = require("../BroadcastChannel");
//导入白名单

const fs = require("fs");

//获取操作符引用
let Op = Sequelize.Op;
let token = "";

class ControlAction {
  test(req, res) {
      res.send({ status: "SUCCESS", msg: "线上测试成功", code: 200 });
  }
  pubishAction (req, res) {
    let o = {
      weixin_openid: '1',
      action_need_number: 100,
      action_start_time: '2022-10-10 12:13:40',
      action_end_time: '2022-10-12 12:13:40',
      action_address: '上海市闵行区',
      action_theme: '爱心帮助',
      action_content: '爱心帮助',
    }
    api.createData('Action',o).then((result) => {
      console.log('result', result);
      res.send({ status: "SUCCESS", msg: "活动发布成功", code: 200 });

    }).catch(e => {
      res.send({ status: "fail", msg: "任务发布失败", code: 200 });

    })
  }

  // 获取最新活动
  get_nearly_actions(req, res) {
    // 用结束时间大于现在的时间表示还没结束的活动
    api.findData('Action', {
      action_end_time: {
        [Op.gt]: '2022-10-13 12:12:12'
      }
    }).then((result) => {
      res.send({ status: "SUCCESS", result: result, })
    }).catch(() => {
      res.send({ status: "fail", msg: "最新活动获取失败", code: 200 })
    })
  }
}

module.exports = new ControlAction;