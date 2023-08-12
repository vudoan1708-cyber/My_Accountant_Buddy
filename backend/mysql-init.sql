-- create databases
CREATE DATABASE IF NOT EXISTS `accountingbuddy-local`;

-- create users and grant rights
CREATE USER 'accountingbuddy'@'%' IDENTIFIED BY 'accountingbuddy';
GRANT ALL PRIVILEGES ON *.* TO 'accountingbuddy'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;

-- import voly.sql
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
USE `accountingbuddy-local`;
