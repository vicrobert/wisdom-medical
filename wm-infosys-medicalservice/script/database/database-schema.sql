/*
SQLyog Enterprise - MySQL GUI v6.15
MySQL - 5.7.22-log : Database - wm_internet_res
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

create database if not exists `wm_internet_res`;

USE `wm_internet_res`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `city` */

DROP TABLE IF EXISTS `city`;

CREATE TABLE `city` (
  `prov_id` bigint(20) unsigned DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL COMMENT 'name',
  `lng` double DEFAULT NULL,
  `lat` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_city` (`prov_id`),
  CONSTRAINT `FK_city_prov` FOREIGN KEY (`prov_id`) REFERENCES `province` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Table structure for table `department` */

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `hosp_id` bigint(20) unsigned DEFAULT NULL COMMENT '医院id',
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `doc_num` int(10) unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '最后更新时间',
  `status` int(5) DEFAULT NULL COMMENT '状态    0 正常;1 删除',
  `parent_dept_id` bigint(20) DEFAULT NULL COMMENT '父部门',
  `tree_level` int(5) DEFAULT NULL COMMENT '在树形结构中的层级,0代表根',
  PRIMARY KEY (`id`),
  KEY `FK_department` (`hosp_id`),
  CONSTRAINT `FK_department` FOREIGN KEY (`hosp_id`) REFERENCES `hospital` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Table structure for table `disease_faq` */

DROP TABLE IF EXISTS `disease_faq`;

CREATE TABLE `disease_faq` (
  `city_id` bigint(20) unsigned DEFAULT NULL COMMENT '城市id',
  `city_name` varchar(100) DEFAULT NULL COMMENT '城市名称',
  `hosp_id` bigint(20) unsigned DEFAULT NULL COMMENT '医院id',
  `hosp_name` varchar(100) DEFAULT NULL COMMENT '医院名称',
  `dept_id` bigint(20) unsigned DEFAULT NULL COMMENT '科室id',
  `dept_name` varchar(100) DEFAULT NULL COMMENT '科室名称',
  `disease_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '疾病uuid',
  `disease_name` varchar(100) DEFAULT NULL COMMENT '疾病名称',
  `ask_num` int(10) DEFAULT NULL COMMENT '提问数',
  `answer_num` int(10) DEFAULT NULL COMMENT '回答数',
  `ask_at` datetime DEFAULT NULL COMMENT '提问时间',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '最后一次修改时间',
  `status` int(5) DEFAULT NULL COMMENT '表状态',
  `ask_content` text COMMENT '患者提问内容',
  `answer_content` text COMMENT '医生回答内容',
  `doc_id` bigint(20) unsigned DEFAULT NULL COMMENT '医生ID',
  PRIMARY KEY (`disease_id`),
  KEY `FK_disease_faq_1` (`hosp_id`),
  KEY `FK_disease_faq_2` (`dept_id`),
  KEY `FK_disease_faq_3` (`city_id`),
  KEY `FK_disease_faq_4` (`doc_id`),
  CONSTRAINT `FK_disease_faq_1` FOREIGN KEY (`hosp_id`) REFERENCES `hospital` (`id`),
  CONSTRAINT `FK_disease_faq_2` FOREIGN KEY (`dept_id`) REFERENCES `department` (`id`),
  CONSTRAINT `FK_disease_faq_3` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`),
  CONSTRAINT `FK_disease_faq_4` FOREIGN KEY (`doc_id`) REFERENCES `doctor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Table structure for table `district` */

DROP TABLE IF EXISTS `district`;

CREATE TABLE `district` (
  `city_id` bigint(20) unsigned DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '社区ID',
  `name` varchar(100) DEFAULT NULL COMMENT '社区名称',
  `district_info` varchar(200) DEFAULT NULL COMMENT '社区详细信息',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '最后更新时间',
  `status` int(5) DEFAULT NULL COMMENT '状态	0 正常;1 删除',
  PRIMARY KEY (`id`),
  KEY `FK_community` (`city_id`),
  CONSTRAINT `FK_district_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Table structure for table `doctor` */

DROP TABLE IF EXISTS `doctor`;

CREATE TABLE `doctor` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `hosp_id` bigint(10) unsigned DEFAULT NULL COMMENT '医院id',
  `hosp_name` varchar(20) DEFAULT NULL,
  `dept_id` bigint(10) unsigned DEFAULT NULL,
  `dept_name` varchar(20) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL COMMENT '医生名称',
  `age` smallint(5) DEFAULT NULL COMMENT '医生年龄',
  `praise` varchar(300) DEFAULT NULL,
  `stars` varchar(300) DEFAULT NULL,
  `pic` varchar(300) DEFAULT NULL COMMENT '医生头像',
  `doc_gender` varchar(10) DEFAULT NULL COMMENT '医生性别',
  `level` varchar(20) DEFAULT NULL COMMENT '医生职称',
  `good_at` varchar(3000) DEFAULT NULL COMMENT '擅长疾病',
  `desc` text COMMENT '简介',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '最后更新时间',
  `doc_search` varchar(3000) DEFAULT NULL COMMENT '搜索关键字',
  `evaluate_num` int(10) DEFAULT NULL,
  `praise_num` int(10) DEFAULT NULL,
  `status` int(5) DEFAULT NULL COMMENT '状态	0 正常;1 删除',
  PRIMARY KEY (`id`),
  KEY `index_id2` (`hosp_id`),
  KEY `index_id3` (`dept_id`),
  CONSTRAINT `FK_doctor_hospid` FOREIGN KEY (`hosp_id`) REFERENCES `hospital` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Table structure for table `hospital` */

DROP TABLE IF EXISTS `hospital`;

CREATE TABLE `hospital` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '医院id',
  `community_name` varchar(100) DEFAULT NULL COMMENT '社区名称',
  `prov_name` varchar(100) DEFAULT NULL,
  `city_name` varchar(100) DEFAULT NULL,
  `district_name` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL COMMENT '医院名称',
  `doc_num` int(10) unsigned DEFAULT NULL COMMENT '医生数量',
  `dept_num` int(10) unsigned DEFAULT NULL COMMENT '部门数量',
  `praise` varchar(100) DEFAULT NULL,
  `stars` varchar(100) DEFAULT NULL,
  `hosp_class` varchar(100) DEFAULT NULL COMMENT '医院类型',
  `address` varchar(1000) DEFAULT NULL COMMENT '医院地址',
  `level` varchar(20) DEFAULT NULL COMMENT '医院等级',
  `pic` varchar(200) DEFAULT NULL COMMENT '医院图片',
  `profiles` text,
  `tel` varchar(100) DEFAULT NULL COMMENT '联系方式',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '最后更新时间',
  `status` int(5) DEFAULT NULL COMMENT '状态	0 正常;1 删除',
  `website` varchar(2000) DEFAULT NULL COMMENT '网址',
  `feature_dept` varchar(2000) DEFAULT NULL COMMENT '特色科室',
  `score` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Table structure for table `hospital_evaluation` */

DROP TABLE IF EXISTS `hospital_evaluation`;

CREATE TABLE `hospital_evaluation` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `hosp_id` bigint(20) unsigned DEFAULT NULL,
  `evaluate_indicator` varchar(100) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_hospital_evaluation_hospid` (`hosp_id`),
  CONSTRAINT `FK_hospital_evaluation_hospid` FOREIGN KEY (`hosp_id`) REFERENCES `hospital` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `hospital_sentiment` */

DROP TABLE IF EXISTS `hospital_sentiment`;

CREATE TABLE `hospital_sentiment` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `hosp_id` bigint(20) unsigned DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` text,
  `source_url` varchar(2000) DEFAULT NULL,
  `keywords` varchar(2000) DEFAULT NULL,
  `picture` varchar(2000) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Table structure for table `province` */

DROP TABLE IF EXISTS `province`;

CREATE TABLE `province` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
