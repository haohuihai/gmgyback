//路由控制器
//导入处理时间模块 monent
let moment = require("moment");
let path = require("path") 
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
  action_image(req,res) {
    const { originalname } = req.file;
    // 创建一个新路径
    let name = 'A' + Math.random().toString().slice(2);
    const newName = name + path.parse(originalname).ext;
    fs.rename(req.file.path, "upload/article/" + newName, function (err) {
        if (err) {
            res.send({ code: 0, msg: "上传失败", data: [] });
        } else {
            res.send({ code: 1, msg: "上传成功", data: newName });
        }
    });
  }
  delete_a_image (url, name) {
    var files = [];

    if (fs.existsSync(url)) {    //判断给定的路径是否存在

        files = fs.readdirSync(url);    //返回文件和子目录的数组

        files.forEach(function (file, index) {

            var curPath = path.join(url, file);

            if (fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
              this.delete_a_image(curPath, name);
            } else {

                if (file.indexOf(name) > -1) {    //是指定文件，则删除
                    fs.unlinkSync(curPath);
                    console.log("删除文件：" + curPath);
                }
            }
        });
    } else {
        console.log("给定的路径不存在！");
    }
  }
}

module.exports = new ControlAction;