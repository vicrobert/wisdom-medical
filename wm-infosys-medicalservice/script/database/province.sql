/*
SQLyog Enterprise - MySQL GUI v6.15
MySQL - 5.6.40 : Database - devbase
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

create database if not exists `devbase`;

USE `devbase`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Data for the table `province` */

insert  into `province`(`id`,`name`) values (1,'广东'),(2,'广西'),(3,'江苏'),(4,'浙江'),(5,'安徽'),(6,'江西'),(7,'福建'),(8,'山东'),(9,'山西'),(10,'河北'),(11,'河南'),(12,'辽宁'),(13,'黑龙江'),(14,'吉林'),(15,'湖北'),(16,'湖南'),(17,'四川'),(18,'陕西'),(19,'甘肃'),(20,'云南'),(21,'新疆'),(22,'内蒙古'),(23,'海南'),(24,'贵州'),(25,'青海'),(26,'宁夏'),(27,'西藏');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
