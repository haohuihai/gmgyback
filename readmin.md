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
| user_id               | varchar() | 用户id       |      | 外键    |
| action_need_number    | varchar() | 需要人数     |      |         |
| action_current_number | varchar   | 实际人数     |      |         |
| action_start_time     |           | 活动起始时间 |      |         |
| action_end_time       |           | 活动结束时间 |      |         |
| action_address        |           | 活动地点     |      |         |
| action_theme          |           | 活动主题     |      |         |
| action_content        |           | 活动内容     |      |         |
|                       |           |              |      |         |
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


数据库密码
Hhh123456