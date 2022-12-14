//路由控制器

//导入处理时间模块 monent
let moment = require("moment");
let { UserActionTime } = require(__basename + '/db/model/model.js')

//导入sequelize
let Sequelize = require("sequelize");

const request = require('request');
//导入API
let api = require(__basename + "/api/api.js");
//导入工具模块
let utils = require(__basename + "/utils/utils.js");
//导入白名单
let whiteList = require(__basename + '/utils/whiteList.js');
// const BroadcastChannel = require("../BroadcastChannel");
//导入白名单
//获取操作符引用
let Op = Sequelize.Op;

class ControlUser {

    //登录验证
    validLogin(req, res, next) {
      console.log('req.url ==>-------------------------------- ', req.url);
  
      let url = req.url.split('?')[0];
  
      if (whiteList.tokenList.indexOf(url) > -1) {
        //截取token
        
        let token = req.headers['token'];
        console.log('token-------', token);
        //需要验证token
        utils.verifyToken(token, (err, decode) => {
          if (err) {
            res.send({msg: '请先登录', code: 303});
          } else {
            req.openid = decode.data;
            next();
          }
        })
  
      } else {
        next();
      }
    }
  // 增加积分
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

  // 实名认证
  certification = async (req, res) => {
    let obj = {
      weixin_openid: req.headers['x-wx-openid'],
      id_card: req.body.id_card,
      phone_number: req.body.phone_number,
      user_name: req.body.user_name,
      id_card_image: req.body.id_card_image,
      
    }
    let value = req.body.phone_number;
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
          res.send({ status: "SUCCESS" });
          }).catch(() => {
            res.send({ status: "fail", msg: '更新用户信息错误' });
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
      const {onlyRealNameNo, onlyRealQR} = await utils.getIdCard(obj.id_card)

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
        weixin_openid: req.openid,
      }).then(result => {
        res.send({ code: 200, result: result});
      }).catch(err => {
        res.send({ code: 400, msg: err});
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
         const data = api.createData("User", {...obj, ...{integral: 10}})
         that.addIntegar({
          weixin_openid: obj.weixin_openid,
          changeName: '注册积分',
          changeValue: 10
        }, data)

            // .then((result) => {
            //   that.addIntegar({
            //       weixin_openid: obj.weixin_openid,
            //       changeName: '注册积分',
            //       changeValue: 10
            //     }, result)
            // })
            // .catch((err) => {
            //   res.send({ status: "fail", msg: '创建用户:'+ err });
            // });
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

  // 获取token
  get_token(req, res) {
    let options = {
      method: 'POST',
      url: 'https://api.weixin.qq.com/sns/jscode2session?',
      formData: {
          appid: config.wxconfig.appid,
          secret: config.wxconfig.secret,
          js_code: req.body.code,
          grant_type: 'authorization_code'
      }
    };

    request(options, (error, response, body) => {
      if(error) { //请求异常时，返回错误信息
        res.send({
          code: 400,
          msg: '服务器异常'
        })
      } else {
          //返回值的字符串转JSON
          const _data = JSON.parse(body);

          const token = utils.signToken(_data.openid, '1d');
          
          // 根据openid查询用户是否存在，存在与否都需要告诉前端
          api.findData('User', {
            weixin_openid: _data.openid
          }).then(result => {
            // 新注册用户
            //生成token
            const o = {
              weixin_openid: _data.openid
            }
            if (result.length == 0) {
              api.createData('User', o).then((result1) => {
                res.send({
                  code: 200,
                  isfirst: true,
                  token: token
                })
              })
            } else {
              res.send({
                code: 200,
                isfirst: true,
                token: token
              })
            }
          })
      }})
  }

  // 修改用户信息 
  set_user_info (req, res) {
    // 解析token
    const o = req.body
    api.updateData('User', o, {
      weixin_openid: req.openid
    }).then((result) => {
      res.send({
        code: 200,
      })
    }).catch((err) => {
      res.send({
        code: 400,
        msg: '服务器错误'
      })
    })
  }
  
  // 获取所有用户
  async all_user_list  (req, res) {
    // 查询条件
    // 同一用户  志愿时长求和
    const totalAmountList = await UserActionTime.findAll({
      attributes: [
        'weixin_openid',
      [Sequelize.fn('SUM', Sequelize.col('time')), 'total_time'],
      ],
      group: 'weixin_openid',
    });

    api.findData('User', {}, undefined).then((result) => {
      if (Array.isArray(result) && result.length) {
       for(let i = 0; i < result.length; i++) {
        result[i].dataValues['total_time'] = 0;
          for (let j = 0; j < totalAmountList.length - 1;j++) {
            if (result[i].weixin_openid === totalAmountList[j].weixin_openid) {
              result[i].dataValues['total_time'] = totalAmountList[j].total_time
            }
          }
       }
      }
      res.send({status: 'SUCCESS', result: result})
    }).catch((err) => {
      res.send({status: 'fail', msg: err})

    })
  }
  // 更新用户
  update_user_info () {
    api.updateData('User', obj, {
      weixin_openid: req.headers['weixin_openid']
    }).then((result) => {
      res.send({status: 'SUCCESS', result: result})
    }).catch((err) => {
      res.send({status: 'fail', msg: err})
    })
  }
}
module.exports = new ControlUser();
