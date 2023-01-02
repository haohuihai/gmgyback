//工具库

//导入加密模块
let crypto = require('crypto');

//导入jsonwebtoken模块
let jsonwebtoken = require('jsonwebtoken');

//导入文件系统模块
let fs = require('fs');

var random = require('string-random');
var qr = require('qr-image');

//导入发邮件模块
let nodemailer = require('nodemailer');
const path = require('path');


//创建发邮件配置
let transport = nodemailer.createTransport({
  //主机
  host: 'smtp.126.com',

  //端口
  port: 465,

  //当端口为465，secure需要设置为true, 25端口在阿里云服务器禁用的
  secure: true,

  //身份授权
  auth: {
    //发件地址
    user: 'web_dev_51zxw@126.com',

    //授权码
    pass: 'DIOCKSLMSIMILOJN'
  }

})

class Uitls {
  
  //加密字符串
  encodeString(value) {
    //以md5加密
    let md5 = crypto.createHash('md5');
    return md5.update(value).digest('hex');
  }

  //发邮件
  sendEmail(emails, code, fn) {
    //emails: string, 123@qq.com,abc@126.com,...
    transport.sendMail({
      //发件地址
      from: 'web_dev_51zxw@126.com',

      //接收地址
      to: emails,

      //主题
      subject: '邮箱验证码',

      //邮箱内容
      text: `邮箱验证码为${code}，5分钟内有效!`
    }, fn)
  }

  //生成token
  signToken(value, expires) {
    
    //value: 生成token的字符串
    //expires: 过期时间

    //expiresIn过期时间写法
    //60 ==> '60s'
    //'100' ==> '100ms'
    //'2 days' ==> '2天'
    //'10h' ==> '10小时'
    //'7d' ==> '7天'
    return jsonwebtoken.sign({data: value}, config.saltOptions.tokenSalt, {
      expiresIn: expires
    });
  }

  //解析token
  verifyToken(value, fn) {
    //value: token字符串
    //fn: 回调函数, (err, decode)
    jsonwebtoken.verify(value, config.saltOptions.tokenSalt,fn);
  }

  //上传图片
  uploadImg(file) {
    //file.type: 文件类型
    //file.base64: 图片base64
    return new Promise((resolve, reject) => {
      //将base64转换程二进制文件
      let buffer = Buffer.from(file.base64, 'base64');

      //文件名
      let filename = '_p' + Math.random().toString().slice(2) + '.' + file.type;

      //将文件写入服务器
      fs.writeFile(__basename + '/upload/' + filename, buffer, err => {
        //如果上传失败
        if (err) {
          reject({msg: '上传文件失败', code: 1021});
        } else {
          resolve({
            msg: '上传文件成功',
            code: 1020,
            filename
          })
        }
      })

    })
  }

  // 单个删除图片
  delete_a_image(url, name) {
  var files = [];

  if (fs.existsSync(url)) {
    //判断给定的路径是否存在
    files = fs.readdirSync(url);//返回文件和子目录的数组
    files.forEach(function (file, index) {
      var curPath = path.join(url, file);

      if (fs.statSync(curPath).isDirectory()) {
        //同步读取文件夹文件，如果是文件夹，则函数回调
        this.delete_a_image(curPath, name);
      } else {
        if (file.indexOf(name) > -1) {
          //是指定文件，则删除
          fs.unlinkSync(curPath);
          return {status: 'success'};
        } else {
          return {status: 'fail', msg: '没找到文件'};
        }
      }
    });
  } else {
    return {status: 'fail', msg: '删除文件失败，路径错误'};
  }
}
   // 产随机字符串
   randomNumber() {
    return 'login/' + random(16, { numbers: true })
  }

  // 根据 randomNumber 的随机随机字符串生成base64二维码
  getQRcode(str) {
    return `data:image/png;base64,${qr.imageSync(str,{ type:'png' }).toString("base64")}`
  }

  getIdCard (id) {
    // 截取身份证前6位  年月日   最后四位随机数
    let preId = id.substring(0,6);
    let middle = id.substring(7, 15);
    let endId = random(4, id)

    // 生成二维码
    let userQR = getQRcode(preId + middle + endId)
    // 生成名片
    // clock()
    return {
      onlyRealNameNo: preId + middle + endId,
      onlyRealQR: userQR,
    }
  }
}

//导出
module.exports = new Uitls();