## 用户

| 字段名称      | 数据类型   | 说明                                               | 备注     | 主/外键 |
| ------------- | ---------- | -------------------------------------------------- | -------- | ------- |
| username      | varchar()  | 用户昵称                                           | 唯一索引 |         |
| user_id       | varchar()  | 用户id                                             | 唯一值   | 主键    |
| password      | varchar()  | 用户密码                                           |          |         |
| gender        | tinyint()  | 性别                                               |          |         |
| birthday      | date       | 生日                                               |          |         |
| nickname      | varchar()  | 用户昵称或网络名称                                 |          |         |
| mobile        | varchar()  | 手机号码                                           |          |         |
| avatar        | varchar()  | 头像图片                                           |          |         |
| weixin_openid | varchar()  | 微信登录openid                                     |          |         |
| session_key   | varchar()  | 微信登录会话KEY                                    |          |         |
| access_token  | varchar()  | 服务端token                                        |          |         |
| status        | tinyint(3) | 0 可用, 1 禁用, 2 注销                             |          |         |
|               |            | 身份证号                                           |          |         |
|               |            | 志愿者编号                                         |          |         |
|               |            | 权限（0000：超级管理员，0001管理员，0002普通用户） |          |         |
|               |            |                                                    |          |         |
|               |            |                                                    |          |         |

### 志愿者时长

志愿者时长是通过参加活动时长来计算的；

### 志愿者编码

志愿者编目前为身份证前6为 ，中间自己的opendId的后4为，最后为4位随机数字

### 等级

### 积分

可以通过参加活动，注册，捐赠物资，捐款

### 邀请志愿者



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

活动主要是有权限的用户发表活动；

1. 发布活动需要超级管理员审核
2. 发布完活动根据时间或其他条件展示在首页；或者在活动页面展示

其他边界条件暂时不考虑，比如时长过长之类的

发布活动在小程序和后台都可以发布

**小程序：**小程序发布活动，只能简单的发布一些文字图片和必要的信息；不能做富文本之类的格式

**后台：**后台发布使用富文本编辑器；发布格式不受限制




## 个人参加活动记录表

| 字段名称              | 数据类型  | 说明         | 备注 | 主/外键 |
| --------------------- | --------- | ------------ | ---- | ------- |
| my_action_id          |varchar()  |              | 自增 |  主键    |
| action_id             | varchar() | 活动id       |      |     |
| weixin_openid         | varchar() | 用户id       |      |         |
| start_time | varchar() | 打卡开始时间 |      |         |
| end_time | varchar   | 打卡开始时间 |      |         |
| late_time |           | 迟到时长 |      |         |
| action_address |           | 打卡地点 |      |         |
|                |           |          |      |         |

个人参加活动，主要用于记录个人参加记录，通过链表查询，查活动相关信息，通过自己的打卡时间和结束时间，来记录自己的志愿时长；



参加活动条件：

1. 在有交叉的时间段内，不可以同时参加两场活动
2. 活动过期活进行中不让参加

<hr />

进入打卡页面，获取特定用户对应的活动列表；

打卡主要是在参加活动的地方进行打卡，记录位置；比如：

我要在XXX村 10.20号12:00-18:00参加敬老活动，那么：

1. 打卡地点：打卡的时候需要定位到XXX村，定位不到，不让打卡；
2. 打卡时间：
   - 过期不让打卡；
   - 提前1小时不让打卡；
   - 打开迟到会记录打卡迟到；
   - 忘记结束打卡，可以申请
   - 忘记开始打卡，可以申请

忘记打卡都会有说明标注

如果没参加任何活动，提示不可以打卡；

在打卡页面，我可以查看我打卡记录；对迟到或未打卡的请求管理员进行打卡，打卡时说明原因；



## 积分表

| 字段名称              | 数据类型  | 说明       | 备注 | 主/外键 |
| --------------------- | --------- | ---------- | ---- | ------- |
| integral_id           | varchar() | 积分id     |      | 主键    |
| weixin_openid         | varchar() | 用户openid |      | 外键    |
| current_value         | varchar() | 当前积分值 |      |         |
| max_integral_val      | varchar   | 最大积分   |      |         |
| integral_change_name  | varchar   | 变更名称   |      |         |
| integral_change_value | varchar   | 变更值     |      |         |

积分表主要记录用户获得积分的过程；

来源：

1. 注册
2. 参加活动
3. 实名认证

目的：

积分可以兑换东西；







数据库密码
Hhh123456





项目进度：

| 后端                   | 前端                     |            |      |
| ---------------------- | ------------------------ | ---------- | ---- |
| 发布活动完成；         | 首页展示完成             |            |      |
| 参加活动完成           |                          |            |      |
| 查看活动未完成         | 查看活动页面未完成       |            |      |
| 打卡未完成             | 打卡页面未完成           |            |      |
| 活动列表条件筛选未完成 | 活动列表页面未完成       | 活动列表页 |      |
| 获取志愿者列表         | 获取志愿者列表页面       | 列表页     |      |
| 顶部banner接口         | 后台--设置顶部banner图片 |            |      |
| 发布活动审核处理       | 后台--审核列表 处理      |            |      |
| 获取所有志愿者用户     | 后台--页面展示所有用户   |            |      |
|                        |                          |            |      |
| 个人信息完善，信息修改 | 个人信息页面             |            |      |
|                        |                          |            |      |
|                        |                          |            |      |

活动添加谁参加了活动的id，字符串形式，','分割

查看页面未完成

志愿者名片的制作：

志愿者编号的生成：前面是身份证前6位 + 所属组织的id前几位（假设为987654） + （出生日期的年月日+登录时的后8位时间戳） 

622621  + 987654 + 19960823

 实名认证后可自动生成

接口说明

string-random的使用

http://www.360doc.com/content/22/0731/09/72809014_1042048987.shtml


获取所有用户接口
获取所有活动接口