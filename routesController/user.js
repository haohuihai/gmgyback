//路由控制器

//导入处理时间模块 monent
let moment = require("moment");

//导入sequelize
let Sequelize = require("sequelize");

//导入API
let api = require(__basename + "/api/api.js");
//导入工具模块
let { getIdCard } = require(__basename + "/utils/utils.js");
// const BroadcastChannel = require("../BroadcastChannel");
//导入白名单

//获取操作符引用
let Op = Sequelize.Op;

class ControlUser {

  // 增加积分
  addIntegar (obj ,result) {

    console.log('-----',obj, result)
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

  // 实名认证
  certification = async (req, res) => {
    let obj = {
      weixin_openid: req.headers['x-wx-openid'],
      id_card: req.body.id_card,
      phone_pumber: req.body.phone_pumber,
      user_name: req.body.user_name,
      id_card_image: req.body.id_card_image,
      
    }
    let value = req.body.phone_pumber;
    let code = req.body.phone_code;

    // 查询验证码是否正确；
    let time = new Date().getTime() - 5 * 60 * 1000;
    let date = moment(time).format("YYYY-MM-DD HH:mm:ss");
    //查询数据
    let dataCode = await api.findData("PhoneCode", {
                      phone_number: value,
                      code,
                      created_at: {
                        [Op.gte]: date,
                      },
                    })
     if (dataCode && dataCode.length) {
        api.createData('UserVerify', obj).then((result) => {
          api.updateData('User', {
            certification_status: 1
          }, {
            weixin_openid: obj.weixin_openid,
        }).then(() => {

          }).catch(() => {

          })
            res.send({ status: "SUCCESS", result });
          }).catch(err => {
            res.send({ status: "fail", msg: err });
          })
     } else {
      res.send({ status: "fail", msg: '验证码不正确或已过期' });
     }   
    }
  // 获取验证码
  get_phone_code (req, res) {
    // 开发环境验证
    let value = req.body.phoneNumber
    let code = Math.random().toString().substr(2, 6);
    api.createData('PhoneCode', {
      phone_number: value,
      code,
    })
    .then(() => {
      res.send({ status: "SUCCESS", code });
    })
    .catch((err) => {
      res.send({ status: "fail", msg: err });
    });
  }
  // 实名认证审核
  sure_certification = async (req, res) => {
    let obj = {
      weixin_openid: req.headers['x-wx-openid'],
      id_card: req.body.id_card,
      mobile: req.body.phone_pumber,
      user_name: req.body.user_name,
      certification_status: req.body.status,
    }
    // 如果审核通过；
    // 要生成一个编号；个人二维码；然后生成一个名片

    if (req.body.status === 2) {
      // 这行执行完会生成一个名片，编号
      const {onlyRealNameNo, onlyRealQR} = await getIdCard(obj.id_card)

      // 获取名片名称
      // 在/assets/user/card文件夹下找身份证号对应的id


    }
    api.updateData('User', obj, {
      weixin_openid: req.headers['x-wx-openid'],
    }).then((result) => {
      res.send({ status: "SUCCESS", result });
    }).catch(err => {
      res.send({ status: "fail", msg: '创建用户:'+ err });
    })
  }
  // 获取用户信息
  get_user_info (req,res) {
    api
      .findData("User", {
        weixin_openid: req.headers['x-wx-openid'],
      }).then(result => {
        res.send({ status: "SUCCESS", result: result});
      }).catch(err => {
        res.send({ status: "fail", msg: err});
      })
  }
  
  // 登录
  login(req, res) {
    let obj = {
      weixin_openid: req.headers['x-wx-openid'],
      access_token: req.headers['x-wx-cloudbase-access-token'],
      nickname: req.body.nickName,
      avatar: req.body.avatarUrl,
      gender: req.body.gender,
      address: req.body.province,
    };
    let that = this;
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
              that.addIntegar({
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
  // 获取所有用户
  all_user_list (req, res) {
    // 查询条件
    api.findData('User', {}, undefined).then((result) => {
      console.log('result', result)
      res.send({status: 'SUCCESS', result})
    }).catch((err) => {
      res.send({status: 'fail', msg: err})

    })
  }
}
module.exports = new ControlUser();
