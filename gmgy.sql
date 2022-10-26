-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2022-10-27 07:23:30
-- 服务器版本： 8.0.12
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `gmgy`
--

-- --------------------------------------------------------

--
-- 表的结构 `aa`
--

CREATE TABLE `aa` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `aa`
--

INSERT INTO `aa` (`id`, `name`) VALUES
(1, 'tom1'),
(2, 'tom2'),
(3, 'tom3');

-- --------------------------------------------------------

--
-- 表的结构 `action`
--

CREATE TABLE `action` (
  `action_id` bigint(20) UNSIGNED NOT NULL COMMENT '活动id',
  `weixin_openid` varchar(150) DEFAULT '' COMMENT '微信登录openid',
  `action_need_number` int(150) DEFAULT '0' COMMENT '参与人数',
  `action_current_number` int(10) DEFAULT '0' COMMENT '当前人数',
  `action_start_time` datetime DEFAULT '2022-10-27 07:21:17' COMMENT '开始时间',
  `action_end_time` datetime DEFAULT '2022-10-27 07:21:17' COMMENT '结束时间',
  `action_address` varchar(32) NOT NULL DEFAULT '' COMMENT '活动地址',
  `action_theme` varchar(100) DEFAULT '' COMMENT '活动主题',
  `action_content` varchar(1000) NOT NULL DEFAULT '' COMMENT '活动内容',
  `action_image` varchar(1000) NOT NULL DEFAULT '' COMMENT '活动封面',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `action`
--

INSERT INTO `action` (`action_id`, `weixin_openid`, `action_need_number`, `action_current_number`, `action_start_time`, `action_end_time`, `action_address`, `action_theme`, `action_content`, `action_image`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '1000', 100, 0, '2022-10-26 22:30:23', '2022-10-26 22:40:23', '甘肃陇南', '助老活动', '帮助在家的老人收拾屋子', '', '2022-10-26 22:02:35', '2022-10-26 22:02:35', NULL),
(2, '1000', 100, 0, '2022-10-26 22:34:23', '2022-10-26 22:50:23', '甘肃武威', '助老活动', '帮助在家的老人收拾屋子', '', '2022-10-26 22:03:17', '2022-10-26 22:03:17', NULL),
(3, '1000', 100, 0, '2022-10-26 22:44:23', '2022-10-26 22:50:23', '甘肃平凉', '助老活动', '帮助在家的老人收拾屋子', '', '2022-10-26 22:03:43', '2022-10-26 22:03:43', NULL),
(4, '1000', 100, 0, '2022-10-26 22:54:23', '2022-10-26 22:58:23', '甘肃兰州', '助老活动', '帮助在家的老人收拾屋子', '', '2022-10-26 22:04:00', '2022-10-26 22:04:00', NULL),
(5, '1000', 100, 0, '2022-10-27 22:54:23', '2022-10-27 22:58:23', '甘肃张掖', '助老活动', '帮助在家的老人收拾屋子', '', '2022-10-26 22:04:24', '2022-10-26 22:04:24', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `bb`
--

CREATE TABLE `bb` (
  `id` int(11) DEFAULT NULL,
  `rhce` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `bb`
--

INSERT INTO `bb` (`id`, `rhce`) VALUES
(1, 100),
(2, 200),
(3, 300);

-- --------------------------------------------------------

--
-- 表的结构 `integral`
--

CREATE TABLE `integral` (
  `integral_id` bigint(20) UNSIGNED NOT NULL COMMENT '积分id',
  `weixin_openid` varchar(100) DEFAULT '' COMMENT '微信登录openid',
  `current_value` int(10) NOT NULL DEFAULT '0' COMMENT '当前积分值',
  `max_integral_val` int(10) NOT NULL DEFAULT '10000' COMMENT '最大积分值',
  `integral_change_name` varchar(10) DEFAULT '0' COMMENT '变更名称',
  `integral_change_value` varchar(100) DEFAULT '' COMMENT '变更值',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `user_id` bigint(20) UNSIGNED NOT NULL COMMENT '用户id',
  `weixin_openid` varchar(150) DEFAULT '' COMMENT '微信登录openid',
  `session_key` varchar(150) DEFAULT '' COMMENT '会话KEY',
  `access_token` varchar(50) DEFAULT '' COMMENT '服务端token',
  `nickname` varchar(30) DEFAULT '' COMMENT '昵称',
  `username` varchar(30) DEFAULT '' COMMENT '微信昵称',
  `unionid` varchar(50) DEFAULT '' COMMENT '用户唯一id',
  `password` varchar(32) NOT NULL DEFAULT '' COMMENT '密码',
  `avatar` varchar(100) DEFAULT 'http://localhost:10000/default.png' COMMENT '用户头像',
  `gender` int(1) NOT NULL DEFAULT '1' COMMENT '性别（0为女1为男）',
  `address` varchar(100) NOT NULL DEFAULT '' COMMENT '地址',
  `birthday` varchar(100) NOT NULL DEFAULT '' COMMENT '生日',
  `status` int(1) DEFAULT '1' COMMENT '是否禁用  1 启用  0 禁用  2 注销',
  `mobile` varchar(15) DEFAULT '' COMMENT '用户手机',
  `integral` int(15) NOT NULL DEFAULT '0' COMMENT '用户总积分',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `user_action`
--

CREATE TABLE `user_action` (
  `my_action_id` bigint(20) UNSIGNED NOT NULL COMMENT '个人活动记录id',
  `action_id` varchar(10) DEFAULT '' COMMENT '活动id',
  `weixin_openid` varchar(150) DEFAULT '' COMMENT '微信登录openid',
  `start_time` datetime DEFAULT '2022-10-27 07:21:17' COMMENT '开始时间',
  `end_time` datetime DEFAULT '2022-10-27 07:21:17' COMMENT '结束时间',
  `late_time` varchar(30) DEFAULT '' COMMENT '迟到时间',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user_action`
--

INSERT INTO `user_action` (`my_action_id`, `action_id`, `weixin_openid`, `start_time`, `end_time`, `late_time`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '5', '2000', '2022-10-27 22:54:23', '2022-10-27 22:58:23', '', '2022-10-26 22:28:21', '2022-10-26 22:28:21', NULL),
(2, '4', '2000', '2022-10-27 22:54:23', '2022-10-27 22:58:23', '', '2022-10-26 22:30:30', '2022-10-26 22:30:30', NULL),
(3, '4', '2001', '2022-10-27 22:54:23', '2022-10-27 22:58:23', '', '2022-10-26 22:57:22', '2022-10-26 22:57:22', NULL),
(4, '4', '2002', '2022-10-27 22:54:23', '2022-10-27 22:58:23', '', '2022-10-26 22:57:47', '2022-10-26 22:57:47', NULL),
(5, '5', '2002', '2022-10-27 22:54:23', '2022-10-27 22:58:23', '', '2022-10-26 22:57:55', '2022-10-26 22:57:55', NULL);

--
-- 转储表的索引
--

--
-- 表的索引 `action`
--
ALTER TABLE `action`
  ADD PRIMARY KEY (`action_id`);

--
-- 表的索引 `integral`
--
ALTER TABLE `integral`
  ADD PRIMARY KEY (`integral_id`);

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- 表的索引 `user_action`
--
ALTER TABLE `user_action`
  ADD PRIMARY KEY (`my_action_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `action`
--
ALTER TABLE `action`
  MODIFY `action_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '活动id', AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `integral`
--
ALTER TABLE `integral`
  MODIFY `integral_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '积分id';

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `user_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户id';

--
-- 使用表AUTO_INCREMENT `user_action`
--
ALTER TABLE `user_action`
  MODIFY `my_action_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '个人活动记录id', AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
