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
  pubishAction(req, res) {
    console.log("req.body", req.body);

    let o = {
      weixin_openid: req.headers["x-wx-openid"],
      action_need_number: req.body.action_need_number,
      action_start_time: req.body.action_start_time,
      action_end_time: req.body.action_end_time,
      action_address: req.body.action_address,
      action_theme: req.body.action_theme,
      action_content: req.body.action_content,
    };
    api
      .createData("Action", o)
      .then((result) => {
        console.log("result", result);
        res.send({ status: "SUCCESS", msg: "活动发布成功", code: 200 });
      })
      .catch((e) => {
        res.send({ status: "fail", msg: "任务发布失败", code: 200 });
      });
  }

  // 通过条件 获取活动
  get_lately_actions(req, res) {
    // 用结束时间大于现在的时间表示还没结束的活动
    api
      .findData("Action", {
        action_end_time: {
          [Op.gt]: "2022-10-13 12:12:12",
        },
      })
      .then((result) => {
        res.send({ status: "SUCCESS", result: result });
      })
      .catch(() => {
        res.send({ status: "fail", msg: "最新活动获取失败", code: 200 });
      });
  }
  // 列举我的活动 根据最新时间排序
  get_my_action(req, res) {
    api
      .findData(
        "Action",
        {
          weixin_openid: req.headers["x-wx-openid"],
        },
        undefined,
        [["action_start_time", "ASC"]]
      )
      .then((result) => {
        res.send({ status: "SUCCESS", result: result });
      })
      .catch((err) => {
        res.send({ status: "fail", msg: "获取我的活动失败", code: 200 });
      });
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

    let current = dayjs().format("YYYY-MM-DD HH:mm:ss");
    
    // 当前活动开始的时间 > 
    api.createData("UserAction", { ...obj })
      .then((result) => {
        res.send({ status: "SUCCESS", result: result });
      })
      .catch((err) => {
        res.send({ status: "fail", msg: err, code: 200 });
      });
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
  delete_a_image(url, name) {
    var files = [];

    if (fs.existsSync(url)) {
      //判断给定的路径是否存在

      files = fs.readdirSync(url); //返回文件和子目录的数组

      files.forEach(function (file, index) {
        var curPath = path.join(url, file);

        if (fs.statSync(curPath).isDirectory()) {
          //同步读取文件夹文件，如果是文件夹，则函数回调
          this.delete_a_image(curPath, name);
        } else {
          if (file.indexOf(name) > -1) {
            //是指定文件，则删除
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

module.exports = new ControlAction();
