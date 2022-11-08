
const fs = require("fs");
const path = require('path');
let url = '../upload/article'
let name = 'vueinit8.png'
// var files = [];
// console.log(__dirname)
// files = fs.readdirSync('../upload/action');
// console.log(files);
// if (fs.existsSync(url)) {
//   //判断给定的路径是否存在

//   files = fs.readdirSync(url); //返回文件和子目录的数组

//   files.forEach(function (file, index) {
//     var curPath = path.join(url, file);

//     if (fs.statSync(curPath).isDirectory()) {
//       //同步读取文件夹文件，如果是文件夹，则函数回调
//       this.delete_a_image(curPath, name);
//     } else {
//       if (file.indexOf(name) > -1) {
//         //是指定文件，则删除
//         fs.unlinkSync(curPath);
//         console.log("删除文件：" + curPath);
//       }
//     }
//   });
// } else {
//   console.log("给定的路径不存在！");
// }
var random = require('string-random');
var qr = require('qr-image');
const clock = require('../examples/clock1')
function getQRcode(str) {
  return `data:image/png;base64,${qr.imageSync(str,{ type:'png' }).toString("base64")}`
}
let id = '622621199608231919'
// 截取身份证前6位  年月日   最后四位随机数
let preId = id.substring(0,6);
let middle = id.substring(6, 14);
let endId = random(4, id)

// 生成二维码
let userQR = getQRcode(preId + middle + endId)

console.log(userQR, preId, middle, endId)

clock(id)

// 调用canvas生成一个名片