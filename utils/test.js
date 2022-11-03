
const fs = require("fs");
const path = require('path');
let url = '../upload/article'
let name = 'vueinit8.png'
var files = [];
console.log(__dirname)
files = fs.readdirSync('../upload/action');
console.log(files);