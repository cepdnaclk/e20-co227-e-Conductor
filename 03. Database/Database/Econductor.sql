-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: econductor
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `Account ID` int NOT NULL AUTO_INCREMENT,
  `User ID` int DEFAULT NULL,
  `Bank Account Number` varchar(255) NOT NULL,
  `Branch` varchar(255) NOT NULL,
  `Beneficiary` varchar(255) NOT NULL,
  `Bank` varchar(255) NOT NULL,
  PRIMARY KEY (`Account ID`),
  KEY `User ID` (`User ID`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`User ID`) REFERENCES `user` (`User ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,3,'495854494','Kandy','A.B.R.Rupasingha','DFCC'),(2,4,'2957687732','Gampaha','K.M.R.Rajapaksha','HNB');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `Account ID` int NOT NULL AUTO_INCREMENT,
  `User ID` int DEFAULT NULL,
  PRIMARY KEY (`Account ID`),
  KEY `User ID` (`User ID`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`User ID`) REFERENCES `user` (`User ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus owner`
--

DROP TABLE IF EXISTS `bus owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus owner` (
  `Owner ID` int DEFAULT NULL,
  `Account ID` int DEFAULT NULL,
  KEY `bus owner_ibfk_1` (`Owner ID`),
  KEY `bus owner_ibfk_2` (`Account ID`),
  CONSTRAINT `bus owner_ibfk_1` FOREIGN KEY (`Owner ID`) REFERENCES `user` (`User ID`),
  CONSTRAINT `bus owner_ibfk_2` FOREIGN KEY (`Account ID`) REFERENCES `user` (`User ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus owner`
--

LOCK TABLES `bus owner` WRITE;
/*!40000 ALTER TABLE `bus owner` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `User ID` int DEFAULT NULL,
  `Role` varchar(10) NOT NULL,
  `Licence ID` varchar(255) DEFAULT NULL,
  `NTC Reg No` varchar(255) NOT NULL,
  `NIC` varchar(255) NOT NULL,
  KEY `User ID` (`User ID`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`User ID`) REFERENCES `user` (`User ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Conductor','78688868','178397ACX','200067945678'),(2,'Conductor',NULL,'2817678GHV','200167945897'),(7,'Driver','4687786768','4544464UOP','199067945297');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passenger`
--

DROP TABLE IF EXISTS `passenger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passenger` (
  `User ID` int DEFAULT NULL,
  `Credits` varchar(255) NOT NULL,
  KEY `User ID` (`User ID`),
  CONSTRAINT `passenger_ibfk_1` FOREIGN KEY (`User ID`) REFERENCES `user` (`User ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passenger`
--

LOCK TABLES `passenger` WRITE;
/*!40000 ALTER TABLE `passenger` DISABLE KEYS */;
INSERT INTO `passenger` VALUES (5,'0'),(6,'12450');
/*!40000 ALTER TABLE `passenger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `Session ID` int NOT NULL AUTO_INCREMENT,
  `User ID` int DEFAULT NULL,
  `OTP` int NOT NULL,
  PRIMARY KEY (`Session ID`),
  KEY `User ID` (`User ID`),
  CONSTRAINT `session_ibfk_1` FOREIGN KEY (`User ID`) REFERENCES `user` (`User ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `User ID` int NOT NULL AUTO_INCREMENT,
  `User Type` varchar(20) NOT NULL,
  `Phone Number` int unsigned NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `First Name` varchar(255) NOT NULL,
  `Last Name` varchar(255) NOT NULL,
  `DoB` date NOT NULL,
  PRIMARY KEY (`User ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Employee',703456862,'john.doe@gmail.com','228$#)@sjn$)@211?><;||','John','Doe','2000-11-11'),(2,'Employee',702754662,'jane.doe@gmail.com','22454656465)@211?><;||','Jane','Doe','2001-01-31'),(3,'Bus Owner',701875862,'amarabandu.rupasingha@hotmail.com','228jkhk09$)@211?><;||kj','Amarabandu','Rupasingha','1960-03-05'),(4,'Admin',704297452,'ranil.rajapaksha@yahoo.com','228$#)@sjn$)opu]?><;||o','Ranil','Rajapaksha','1955-04-25'),(5,'Passenger',702424862,'walter.white@eng.pdn.ac.lk','087$#)@sjn$)@217678||p','Walter','White','1970-10-10'),(6,'Passenger',702975672,'gus.fring@yahoo.com','878$#)@sjn$)@211?pi[i77','Gus','Fring','1985-06-21'),(7,'Employee',753467546,'mahinda.premadasa@gmail.com','4459jn$)@211?><;||','Mahinda','Premadasa','1990-04-01');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle` (
  `Vehicle ID` int NOT NULL AUTO_INCREMENT,
  `Owner ID` int DEFAULT NULL,
  `Vehicle Reg No` varchar(255) NOT NULL,
  `NTC Reg No` varchar(255) NOT NULL,
  `Seat Capacity` int NOT NULL,
  PRIMARY KEY (`Vehicle ID`),
  KEY `Owner ID` (`Owner ID`),
  CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`Owner ID`) REFERENCES `user` (`User ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-01 19:43:29
