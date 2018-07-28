/*
SQLyog Enterprise - MySQL GUI v6.15
MySQL - 5.7.22-log : Database - wm_crawler
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

create database if not exists `wm_crawler`;

USE `wm_crawler`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `doctor_statistic` */

DROP TABLE IF EXISTS `doctor_statistic`;

CREATE TABLE `doctor_statistic` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `sample_num` bigint(20) unsigned DEFAULT NULL COMMENT '医生累计采集数量',
  `template_id` bigint(20) unsigned DEFAULT NULL COMMENT '采集模板ID',
  `time_stamp` bigint(20) unsigned DEFAULT NULL COMMENT '绝对时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `doctor_statistic` */

/*Table structure for table `doctorinfo` */

DROP TABLE IF EXISTS `doctorinfo`;

CREATE TABLE `doctorinfo` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `age` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `dept_id` bigint(20) unsigned DEFAULT NULL,
  `dept_name` varchar(255) DEFAULT NULL,
  `desc` text,
  `doc_search` varchar(255) DEFAULT NULL,
  `evaluate_num` int(11) DEFAULT NULL,
  `doc_gender` varchar(2000) DEFAULT NULL,
  `good_at` varchar(2000) DEFAULT NULL,
  `hosp_id` bigint(20) unsigned DEFAULT NULL,
  `hosp_name` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `praise` varchar(255) DEFAULT NULL,
  `praise_num` int(11) DEFAULT NULL,
  `stars` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `doctorinfo` */

/*Table structure for table `drug_statistic` */

DROP TABLE IF EXISTS `drug_statistic`;

CREATE TABLE `drug_statistic` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `sample_num` bigint(20) unsigned DEFAULT NULL COMMENT '药品采集总数',
  `template_id` bigint(20) unsigned DEFAULT NULL COMMENT '采集模板ID',
  `time_stamp` bigint(20) unsigned DEFAULT NULL COMMENT '绝对时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `drug_statistic` */

/*Table structure for table `druginfo` */

DROP TABLE IF EXISTS `druginfo`;

CREATE TABLE `druginfo` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `content` text COMMENT '获取的药品信息内容',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `url` varchar(2000) DEFAULT NULL COMMENT '关联网站URL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `druginfo` */

/*Table structure for table `interactinfo` */

DROP TABLE IF EXISTS `interactinfo`;

CREATE TABLE `interactinfo` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `content` text COMMENT '互动信息内容',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `url` varchar(2000) DEFAULT NULL COMMENT '关联网站URL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `interactinfo` */

/*Table structure for table `interactinfo_statistic` */

DROP TABLE IF EXISTS `interactinfo_statistic`;

CREATE TABLE `interactinfo_statistic` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `sample_num` bigint(20) unsigned DEFAULT NULL COMMENT '互动信息采集总数',
  `template_id` bigint(20) unsigned DEFAULT NULL COMMENT '采集模板ID',
  `time_stamp` bigint(20) unsigned DEFAULT NULL COMMENT '绝对时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `interactinfo_statistic` */

/*Table structure for table `sample_strength` */

DROP TABLE IF EXISTS `sample_strength`;

CREATE TABLE `sample_strength` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `strength` double DEFAULT NULL COMMENT '采集强度指数',
  `time_stamp` bigint(20) unsigned DEFAULT NULL COMMENT '绝对时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `sample_strength` */

/*Table structure for table `system_log` */

DROP TABLE IF EXISTS `system_log`;

CREATE TABLE `system_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL COMMENT '日志内容',
  `created_at` datetime DEFAULT NULL COMMENT '产生时间',
  `level` int(11) DEFAULT NULL COMMENT '级别：0-信息,1-告警,2-错误',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `system_log` */

/*Table structure for table `template_config` */

DROP TABLE IF EXISTS `template_config`;

CREATE TABLE `template_config` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `app_id` bigint(20) unsigned NOT NULL COMMENT '应用ID',
  `charset` varchar(50) DEFAULT NULL COMMENT '字符集',
  `created_at` datetime DEFAULT NULL COMMENT '添加时间',
  `sample_freq` int(11) DEFAULT NULL COMMENT '采样频率',
  `task_name` varchar(255) DEFAULT NULL COMMENT '任务名称',
  `temp_location` varchar(2000) DEFAULT NULL COMMENT '模板路径位置',
  `type` varchar(255) DEFAULT NULL COMMENT '类型',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `url` varchar(2000) DEFAULT NULL COMMENT '目标网站网址',
  `web_name` varchar(255) DEFAULT NULL COMMENT '目标网站名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `template_config` */

insert  into `template_config`(`id`,`app_id`,`charset`,`created_at`,`sample_freq`,`task_name`,`temp_location`,`type`,`updated_at`,`url`,`web_name`) values (1,0,'UTF-8',NULL,NULL,'采集医院信息',NULL,NULL,NULL,'http://z.xywy.com/yiyuan.htm','寻医问诊'),(2,0,'UTF-8',NULL,NULL,'采集科室信息',NULL,NULL,NULL,'http://z.xywy.com/yiyuan.htm','寻医问诊'),(3,0,'UTF-8',NULL,NULL,'采集医生信息',NULL,NULL,NULL,'http://z.xywy.com/yiyuan.htm','寻医问诊'),(4,0,'UTF-8',NULL,NULL,'采集医患信息',NULL,NULL,NULL,'http://z.xywy.com/yiyuan.htm','寻医问诊'),(5,0,'UTF-8',NULL,NULL,'最新舆情',NULL,NULL,NULL,'http://www.sh.chinanews.com/yljk/index.shtml','上海新闻网');

/*Table structure for table `websitesample_status` */

DROP TABLE IF EXISTS `websitesample_status`;

CREATE TABLE `websitesample_status` (
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `status` int(11) DEFAULT NULL COMMENT '爬取模板状态：0-正常,1-网络连接异常,2-模板配置错误',
  `template_id` bigint(20) unsigned NOT NULL COMMENT '对应采集模板ID',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`template_id`),
  CONSTRAINT `FK_websitesample_status_templateid` FOREIGN KEY (`template_id`) REFERENCES `template_config` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `websitesample_status` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
