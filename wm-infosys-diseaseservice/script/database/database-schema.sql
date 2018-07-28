/*
SQLyog Enterprise - MySQL GUI v6.15
MySQL - 5.7.22-log : Database - wm_disease
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

create database if not exists `wm_disease`;

USE `wm_disease`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `disease` */

DROP TABLE IF EXISTS `disease`;

CREATE TABLE `disease` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `icd10` varchar(255) DEFAULT NULL COMMENT 'icd10编号',
  `name` varchar(255) DEFAULT NULL COMMENT '疾病名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Table structure for table `disease_prediction` */

DROP TABLE IF EXISTS `disease_prediction`;

CREATE TABLE `disease_prediction` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `disease_id` bigint(20) unsigned DEFAULT NULL,
  `cnt_male` int(10) unsigned DEFAULT NULL,
  `cnt_female` int(10) unsigned DEFAULT NULL,
  `occur_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_m_disease_prediction_1` (`disease_id`),
  CONSTRAINT `FK_disease_prediction_1` FOREIGN KEY (`disease_id`) REFERENCES `disease` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Table structure for table `disease_statistics` */

DROP TABLE IF EXISTS `disease_statistics`;

CREATE TABLE `disease_statistics` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `disease_id` bigint(20) unsigned DEFAULT NULL,
  `patient_id` bigint(20) unsigned DEFAULT NULL,
  `occur_year` int(11) DEFAULT NULL COMMENT '发生年',
  `occur_season` varchar(6) DEFAULT NULL COMMENT '发生季度 春夏秋冬',
  `occur_month` int(11) DEFAULT NULL COMMENT '发生月',
  `occur_day` int(11) DEFAULT NULL COMMENT '发生日',
  `occur_times` int(11) DEFAULT NULL COMMENT '发生的次数',
  `statistical_type` varchar(10) DEFAULT NULL COMMENT '统计类型:''门诊'',''住院''',
  PRIMARY KEY (`id`),
  KEY `FK_m_disease_statistics_1` (`disease_id`),
  KEY `FK_m_disease_statistics_2` (`patient_id`),
  CONSTRAINT `FK_disease_statistics_1` FOREIGN KEY (`disease_id`) REFERENCES `disease` (`id`),
  CONSTRAINT `FK_disease_statistics_2` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Table structure for table `doctor_recommend` */

DROP TABLE IF EXISTS `doctor_recommend`;

CREATE TABLE `doctor_recommend` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `doctor_id` bigint(20) unsigned DEFAULT NULL COMMENT '医生ID,唯一索引',
  `treat_num` bigint(20) unsigned DEFAULT NULL COMMENT '诊疗数',
  `comment_num` bigint(20) unsigned DEFAULT NULL COMMENT '评价数',
  `treat_year` int(10) unsigned DEFAULT NULL COMMENT '诊疗时间年',
  `treat_month` int(10) unsigned DEFAULT NULL COMMENT '评论时间月',
  PRIMARY KEY (`id`),
  UNIQUE KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `FK_doctor_recommend` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Table structure for table `drug_catalog` */

DROP TABLE IF EXISTS `drug_catalog`;

CREATE TABLE `drug_catalog` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `class_name` varchar(255) DEFAULT NULL COMMENT '分类名',
  `type_name` varchar(255) DEFAULT NULL COMMENT '类型名:一类抗生素 二类抗生素 非抗生素等',
  `source` varchar(255) DEFAULT NULL COMMENT '来源',
  `manufacturer` varchar(255) DEFAULT NULL COMMENT '生产厂家',
  `manufacture_at` datetime DEFAULT NULL COMMENT '生产日期',
  `date_of_storage` datetime DEFAULT NULL COMMENT '入库日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

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
  `hosp_class` varchar(300) DEFAULT NULL,
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
  `lng` double DEFAULT NULL,
  `lat` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Table structure for table `patient` */

DROP TABLE IF EXISTS `patient`;

CREATE TABLE `patient` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `sex` varchar(2) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `marital_status` tinyint(1) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL COMMENT '职业',
  `nation` varchar(255) DEFAULT NULL COMMENT '民族',
  `nationality` varchar(255) DEFAULT NULL COMMENT '国籍',
  `certificate_type` int(5) DEFAULT NULL COMMENT '证件类型',
  `certificate_no` varchar(255) DEFAULT NULL COMMENT '证件编号',
  `tel` varchar(20) DEFAULT NULL COMMENT '电话',
  `area` varchar(100) DEFAULT NULL COMMENT '地址',
  `community` varchar(100) DEFAULT NULL COMMENT '所在社区',
  `hobby` varchar(100) DEFAULT NULL COMMENT '爱好',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Table structure for table `pharmacy_statistics` */

DROP TABLE IF EXISTS `pharmacy_statistics`;

CREATE TABLE `pharmacy_statistics` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `drug_catalog_id` bigint(20) unsigned DEFAULT NULL,
  `sale_num` int(10) unsigned DEFAULT NULL,
  `sale_year` int(10) unsigned DEFAULT NULL,
  `sale_month` int(10) unsigned DEFAULT NULL,
  `hosp_id` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_m_pharmacy_statistics_1` (`drug_catalog_id`),
  KEY `FK_pharmacy_statistics` (`hosp_id`),
  CONSTRAINT `FK_pharmacy_statistics` FOREIGN KEY (`hosp_id`) REFERENCES `hospital` (`id`),
  CONSTRAINT `FK_pharmacy_statistics_1` FOREIGN KEY (`drug_catalog_id`) REFERENCES `drug_catalog` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
