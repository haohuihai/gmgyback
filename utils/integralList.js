// 记录都什么需要加积分 和积分的值
let INTEGRAL = {
  '0': '登录',
  '1': '参加活动',
}

// 积分值
const INTERRALVAL = {
  '0': 10,
  '1': 20,
}


// 等级 计算规则 
// 积分值 + 志愿时长
// 分为7个等级
// 默认是1等级  

// 1  0积分 + 0小时志愿时长
// 2  100积分 + 10小时志愿时长
// 3  300积分 + 20志愿时长
// 4  600积分 + 40志愿时长
// 5  1000积分 + 70志愿时长
// 6  1500积分 + 110志愿时长
// 7  2100积分 + 160志愿时长

// 规则是在上一次的积分上积分加100 志愿时长加10小时


export default INTERRALVAL;