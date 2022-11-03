//路由控制器
//导入处理时间模块 monent
let moment = require("moment");
let path = require("path");
var dayjs = require("dayjs");
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
  // 发布活动
  pubish_action(req, res) {
    console.log("req.body", req.body);

    let o = {
      weixin_openid: req.headers["x-wx-openid"],
      action_need_number: req.body.action_need_number,
      action_start_time: req.body.action_start_time,
      action_end_time: req.body.action_end_time,
      action_address: req.body.action_address,
      action_theme: req.body.action_theme,
      action_content: req.body.action_content,
      action_image: req.body.action_image,
      action_latitude: req.body.action_latitude,
      action_longitude: req.body.action_longitude
    };
    api
      .createData("Action", o)
      .then((result) => {
        console.log("result", result);
        res.send({ status: "SUCCESS", msg: "活动发布成功", code: 200 });
      })
      .catch((e) => {
        res.send({ status: "fail", msg: e, code: 200 });
      });
  }

  // 通过条件 获取活动
  get_lately_actions(req, res) {
    // 用结束时间大于现在的时间表示还没结束的活动
    api
      .findData("Action")
      .then((result) => {
        res.send({ status: "SUCCESS", result: result });
      })
      .catch(() => {
        res.send({ status: "fail", msg: "最新活动获取失败", code: 200 });
      });
  }
  // 列举我的活动 根据可筛选   最新时间排序

  // 获取我的所有活动
  // 获取我打卡后的活动
  // 获取我未打卡的活动
  // 获取已失效的活动
  // 
  get_my_action(req, res) {
    let obj = {}
    // 获取我的所有活动
    obj = {
      weixin_openid: req.headers["x-wx-openid"],
    }
    // 获取我是否参加过了的活动
    // obj = {
    //   is_join: req.query.is_join
    // }
    // obj = {
      
    // }
    api
      .findData(
        "UserAction",
        obj,
        undefined,
        [["start_time", "ASC"]]
      )
      .then((result) => {
        res.send({ status: "SUCCESS", result: result });
      })
      .catch((err) => {
        res.send({ status: "fail", msg: "获取我的活动失败", code: 200 });
      });
  }

  // 获取活动详情   这里可以通过链表查询   用户参加后的记录表  和活动表   通过action_id来查用户和活动详情
  get_join_action_user (req,res) {
    api.findData('UserAction', {
      action_id: req.query.action_id
    }, [
      'weixin_openid', 'avatar'
    ]).then((result) => {
      res.send({ status: "SUCCESS", result: result });
    }).catch(err => {
      res.send({ status: "fail", msg: err });
    })
  }
  // 一个活动对于多个user  一对多查询
  get_action_detail(req, res) {
    api.findData('Action', {
      action_id: req.query.action_id
    }).then((result) => {
      res.send({ status: "SUCCESS", result: result });
    }).catch(err => {
      res.send({ status: "fail", msg: err });
    })
  }

  // 加入活动  不打卡
  join_action(req, res) {
    // 后端判断时间
    // 时间不通过  给出提示
    // 判断是否已经加入了活动
    
    // 时间通过
    // 数据库加入数据
    let obj = {
      weixin_openid: req.headers["x-wx-openid"],
      action_id: req.body.action_id,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
    };

    // 查找是否已经加入
    api.findData('UserAction', {
      action_id: req.body.action_id,
      weixin_openid: req.headers["x-wx-openid"],
    }).then((result1) => {
      console.log();
      if(result1.length) {
        res.send({status: "SUCCESS", msg: '已加入该活动'})
      } else {
        // 当前活动开始的时间 > 
        api.createData("UserAction", { ...obj })
        .then((result) => {
          res.send({ status: "SUCCESS", result: result });
        })
        .catch((err) => {
          res.send({ status: "fail", msg: err });
        });
      }
    }).catch(err => {
      res.send({ status: "fail", msg: err, code: 200 });
    })
    let current = dayjs().format("YYYY-MM-DD HH:mm:ss");
  }

  // 发布活动上传图片
  action_image(req, res) {
    const { originalname } = req.file;
    // 创建一个新路径
    let name = "A" + Math.random().toString().slice(2);
    const newName = name + path.parse(originalname).ext;
    fs.rename(req.file.path, "upload/article/" + newName, function (err) {
      if (err) {
        res.send({ code: 0, msg: "上传失败", data: [] });
      } else {
        res.send({ code: 1, msg: "上传成功", data: newName });
      }
    });
  }
  // 删除活动图片
  delete_image = async (req, res) => {
    let url = ''
    let name = req.query.name
    if (req.query.type === '1') {
      url = './upload/action'
    } else {

    }
    await utils.delete_a_image(url,  name)

    res.send({ code: 1, msg: "删除成功" });
  }
}

module.exports = new ControlAction();
