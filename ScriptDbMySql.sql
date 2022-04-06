/*
SQLyog Community Edition- MySQL GUI v6.05
Host - 5.7.32-35-log : Database - leilaonivello
*********************************************************************
Server version : 5.7.32-35-log
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

create database if not exists `leilaonivello`;

USE `leilaonivello`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `Lances` */

DROP TABLE IF EXISTS `Lances`;

CREATE TABLE `Lances` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `PessoaId` int(11) NOT NULL,
  `Valor` decimal(10,2) NOT NULL,
  `DataLance` datetime(6) NOT NULL,
  `ProdutoId` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `IX_Lances_PessoaId` (`PessoaId`),
  KEY `IX_Lances_ProdutoId` (`ProdutoId`),
  CONSTRAINT `FK_Lances_Pessoas_PessoaId` FOREIGN KEY (`PessoaId`) REFERENCES `Pessoas` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Lances_Produtos_ProdutoId` FOREIGN KEY (`ProdutoId`) REFERENCES `Produtos` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `Pessoas` */

DROP TABLE IF EXISTS `Pessoas`;

CREATE TABLE `Pessoas` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(250) NOT NULL,
  `Idade` int(11) NOT NULL,
  `Email` varchar(70) DEFAULT NULL,
  `Senha` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `Produtos` */

DROP TABLE IF EXISTS `Produtos`;

CREATE TABLE `Produtos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(250) NOT NULL,
  `Valor` decimal(10,2) NOT NULL,
  `Foto` longblob NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `__EFMigrationsHistory` */

DROP TABLE IF EXISTS `__EFMigrationsHistory`;

CREATE TABLE `__EFMigrationsHistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
