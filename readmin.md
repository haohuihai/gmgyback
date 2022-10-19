## 用户

| 字段名称      | 数据类型   | 说明                   | 备注     | 主/外键 |
| ------------- | ---------- | ---------------------- | -------- | ------- |
| username      | varchar()  | 用户昵称               | 唯一索引 |         |
| user_id       | varchar()  | 用户id                 | 唯一值   | 主键    |
| password      | varchar()  | 用户密码               |          |         |
| gender        | tinyint()  | 性别                   |          |         |
| birthday      | date       | 生日                   |          |         |
| nickname      | varchar()  | 用户昵称或网络名称     |          |         |
| mobile        | varchar()  | 用户手机号码           |          |         |
| avatar        | varchar()  | 用户头像图片           |          |         |
| weixin_openid | varchar()  | 微信登录openid         |          |         |
| session_key   | varchar()  | 微信登录会话KEY        |          |         |
| access_token  | varchar()  | 服务端token            |          |         |
| status        | tinyint(3) | 0 可用, 1 禁用, 2 注销 |          |         |
|               |            |                        |          |         |

## 等级

| 字段名称 | 数据类型  | 说明     | 备注 | 主/外键 |
| -------- | --------- | -------- | ---- | ------- |
| level_id | varchar() | 等级id   |      | 主键    |
| user_id  | varchar() | 用户id   |      | 外键    |
| level    | varchar() | 等级     |      |         |
| process  | varchar   | 当前进度 |      |         |
|          |           |          |      |         |
|          |           |          |      |         |

## 活动

| 字段名称              | 数据类型  | 说明         | 备注 | 主/外键 |
| --------------------- | --------- | ------------ | ---- | ------- |
| action_id             | varchar() | 活动id       |      | 主键    |
| weixin_openid         | varchar() | 用户id       |      | 外键    |
| action_need_number    | varchar() | 需要人数     |      |         |
| action_current_number | varchar   | 实际人数     |      |         |
| action_start_time     |           | 活动起始时间 |      |         |
| action_end_time       |           | 活动结束时间 |      |         |
| action_address        |           | 活动地点     |      |         |
| action_theme          |           | 活动主题     |      |         |
| action_content        |           | 活动内容     |      |         |
| action_image          |           | 活动封面     |      |         |
|                       |           |              |      |         |
|                       |           |              |      |         |

## 签到

| 字段名称     | 数据类型  | 说明           | 备注 | 主/外键 |
| ------------ | --------- | -------------- | ---- | ------- |
| sign_id      | varchar() | 签到id         |      | 主键    |
| user_id      | varchar() | 用户id         |      | 外键    |
| sign_time    | varchar() | 签到时间(坐标) |      |         |
| sign_address | varchar   | 签到地点       |      |         |
| is_overtime  |           | 是否补签       |      |         |
| sign_points  |           | 签到坐标       |      |         |

签到主要是在参加活动的地方进行签到，记录位置；比如：

我要在XXX村 10.20号12:00-18:00参加敬老活动，那么，签到的时候需要定位到XXX村，定位不到，不让签到；参加签到时间可以在20号6点到18点都可以允许签到。但超过12点，会记录迟到签到；并有标记

所以签到要跟活动关联起来；

如果没参加任何活动，提示不可以签到；

在签到页面，我可以查看我签到记录；对迟到或未签到的请求管理员进行签到，签到时说明原因；

------

出现多个签到活动怎么办；

所以进入签到页面，选择签到的活动；

根据签到的活动来判断位置和时间

基于活动来做签到功能，现在先完成活动的设计

<hr />

进入打卡页面，获取特定用户对应的活动列表；

### 活动

参加活动

## 积分表

| 字段名称              | 数据类型  | 说明       | 备注 | 主/外键 |
| --------------------- | --------- | ---------- | ---- | ------- |
| integral_id           | varchar() | 积分id     |      | 主键    |
| weixin_openid         | varchar() | 用户openid |      | 外键    |
| current_value         | varchar() | 当前积分值 |      |         |
| max_integral_val      | varchar   | 最大积分   |      |         |
| integral_change_name  | varchar   | 变更名称   |      |         |
| integral_change_value | varchar   | 变更值     |      |         |

积分表主要记录用户获得积分的，目前主要通过注册、等这些来获得积分   查积分取当前积分就可以了

## 签到



数据库密码
Hhh123456