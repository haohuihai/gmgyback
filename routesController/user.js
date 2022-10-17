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

  addIntegar (obj ,result) {
    api.createData('Integral', {
      weixin_openid: obj.weixin_openid,
      integral_change_name: obj.changeName,
      integral_change_value: obj.changeValue,
    }).then((result1) => {
      // 这里用户注册,默认加10积分
      res.send({ status: "SUCCESS", result: result });
    }).catch ((err) => {
      res.send({ status: "fail", msg: '积分添加失败:' + err });
    })
  }
  login(req, res) {
    console.log('req.headers', req.headers)
    let obj = {
      weixin_openid: req.headers['x-wx-openid'],
      access_token: req.headers['x-wx-cloudbase-access-token'],
      nickname: req.body.nickName,
      avatar: req.body.avatarUrl,
      gender: req.body.gender,
      address: req.body.province,
    };
    api
      .findData("User", {
        weixin_openid: obj.weixin_openid,
      })
      .then((result1) => {
        if (result1.length === 0) {
          //账号没有注册
          api
            .createData("User", {...obj, ...{integral: 10}})
            .then((result) => {
                this.addIntegar({
                  weixin_openid: obj.weixin_openid,
                  changeName: '注册积分',
                  changeValue: 10
                }, result)
            })
            .catch((err) => {
              res.send({ status: "fail", msg: '创建用户:'+ err });
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
                res.send({ status: "fail1", msg: '更新用户:' + err});
            });
        }
      })
      .catch((err) => {
        res.send({ status: "fail", msg: "登录失败", code: 101 });
      });
  }
}
module.exports = new ControlUser();
