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

class ControlUser {
  login(req, res) {
    console.log('req.headers', req.headers)
    let obj = {
      weixin_openid: req.headers['x-wx-openid'],
      nickname: req.body.nickName,
      avatar: req.body.avatarUrl,
      gender: req.body.gender,
      address: req.body.province,
    };
    console.log('req.body', req.body)
    api
      .findData("User", {
        weixin_openid: req.headers['x-wx-openid'],
      })
      .then((result1) => {
        if (result1.length === 0) {
          //账号没有注册
          api
            .createData("User", obj)
            .then((result) => {
              res.send({ status: "SUCCESS", result: result });
            })
            .catch((err) => {
              res.send({ status: "fail", msg: err });
            });
        } else {
          // 账号已经注册过  更新数据
          api.updateData("User", obj, {
                weixin_openid: obj.weixin_openid,
            })
            .then((result) => {
               res.send({ status: "SUCCESS", result: {...result1[0].dataValues, ...obj }});
            })
            .catch((err) => {
                res.send({ status: "fail", msg: err});
            });
        }
      })
      .catch((err) => {
        res.send({ status: "fail", msg: "登录失败", code: 101 });
      });
  }
}
module.exports = new ControlUser();
